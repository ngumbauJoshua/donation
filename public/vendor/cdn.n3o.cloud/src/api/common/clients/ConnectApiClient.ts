import { IApiHeaders } from "@n3oltd/karakoram.connect.sdk.connect";
import ApiResponseModel, {
  IApiResponse,
  ConnectStatusCodes,
  ProblemDetails,
  ServerError,
} from "./ApiResponseModel";
import { invokeGlobalErrorHandler } from "../utils/globalErrorHandler";

export class ConnectApiClient  {
  static token: string;
  static subscriptionId: string;
  static errorHandler: any;

  public static setToken(token: string) {
    this.token = token;
  }

  public static getToken() {
    return this.token;
  }

  public static setSubscriptionId(id: string) {
    this.subscriptionId = id;
  }

  public static getSubscriptionId() {
    return this.subscriptionId || "";
  }

  public static setErrorHandler(handler: any) {
    return this.errorHandler = handler;;
  }

  private successResponseClient = <T>(res: T) => {
    return new ApiResponseModel(res);
  };

  public readonly defaultClientConfiguration: IApiHeaders = {
    getBearerToken: () => {
      if(ConnectApiClient.getToken()){
        return `Bearer ${ConnectApiClient.getToken()}`;
      }

      return '';
    },
    getSubscriptionId: () => ConnectApiClient.getSubscriptionId(),
  };



  private errorResponseClient = (restError: ProblemDetails): IApiResponse<any> => {
    // 500 Errors are not returned by the clients already parsed into ProblemDetails, so attempt to parse them here
    if (restError.response) {
      try {
        if (restError.status && restError.status >= 500) {
          invokeGlobalErrorHandler();
          ConnectApiClient.errorHandler?.(restError);
        }
        restError = JSON.parse(restError.response);
      } catch (e) {
        console.error(e);
      }
    }

    const serverError = new ServerError(restError, restError?.status);
    return new ApiResponseModel<any>(null, serverError);
  };


  toResponse = <T>(p: Promise<T>): Promise<IApiResponse<T>> => {
    return p
      .then((r: T) => {
        const isUnauthorized =
          (r as any)?._response?.status === ConnectStatusCodes.unAuthorized;

        if (isUnauthorized)
          return Promise.reject({
            ...r,
            statusCode: ConnectStatusCodes.unAuthorized,
          });

        return this.successResponseClient(r);
      })
      ?.catch(this.errorResponseClient);
  };
}

export default new ConnectApiClient();
