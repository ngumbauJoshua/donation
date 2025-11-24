import { type FunctionComponent } from "preact";
import { NULL } from "constants/primitives";
import { SiteCookie } from "helpers/fetchSiteCookies";
import SiteCookiesTable from "./SiteCookiesTable";
import SiteCookiesTableAlternate from "./SiteCookiesTableAlternate";

const SiteCookiesTableContainer: FunctionComponent<
  ISiteCookiesTableContainerProps
> = ({ layout = "table", ...props }) => {
  if (layout === "table") {
    return <SiteCookiesTable {...props} />;
  }
  if (layout === "alternate") {
    return <SiteCookiesTableAlternate {...props} />;
  }

  return NULL;
};

export interface ISiteCookiesTableContainerProps {
  layout?: "table" | "alternate";
  cookies: SiteCookie[];
  updatedAt: string;
}

export default SiteCookiesTableContainer;
