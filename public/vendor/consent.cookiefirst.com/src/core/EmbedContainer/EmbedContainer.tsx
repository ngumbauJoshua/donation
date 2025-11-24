import Spinner from "components/Spinner";
import RootContainer from "core/RootContainer/RootContainer";
import { ISiteCookiesApiResponse } from "helpers/fetchSiteCookies";
import isFunction from "helpers/isFunction";
import useLoadSiteCookies from "hooks/useLoadSiteCookies";

const EmbedContainer = ({ children }: IEmbedContainerProps) => {
  const [scan, isLoadingScan] = useLoadSiteCookies();

  if (isLoadingScan) {
    return (
      <RootContainer>
        <Spinner />
      </RootContainer>
    );
  }

  if (isFunction(children)) {
    return children({ scan });
  }

  return children;
};

export interface IEmbedContainerProps {
  children: (arg: {
    scan: ISiteCookiesApiResponse;
  }) => JSX.Element | JSX.Element;
}

export default EmbedContainer;
