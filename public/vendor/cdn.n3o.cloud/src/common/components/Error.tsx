import { ValidationError } from "@n3oltd/n3o-ui-components";

export type Props = {
  error: any;
}

export const ServerError = ({error}: Props) => {

  if (error.status === 400) {
    return error.title && <ValidationError>
      {error.title}
      <ul className="list-disc list-inside">
      {Object.entries(error.errors).map(([key, value]: any) => (
          key && <li key={key}>{key}: {value?.[0]}</li>
        ))}
        </ul>
    </ValidationError> 
  }
  
  if (error.status === 409) {
    return error.data.detail && <ValidationError>
      {error.data.detail}
    </ValidationError> 
  }

  if (error.status === 412) {
    return (
      <ValidationError>
        {error.title || error.data.title}
        <ul className="list-disc list-inside pt-2">
          {(error?.errors || error?.data?.errors)?.map((e: any) => (
            <li key={e.error}>{e.error}</li>
          ))}
        </ul>
      </ValidationError>
    );
  }

  return <ValidationError>
    {error.title || error.data?.title || error.message || error.data?.message}
    </ValidationError>
  
}