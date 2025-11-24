import { type FunctionComponent } from "preact";
import { UNCLASSIFIED, categories } from "constants/categories";

import HandIcon from "./hand.svg";
import { NULL } from "constants/primitives";
import { SiteCookie } from "helpers/fetchSiteCookies";
import classNames from "helpers/classNames";
import styles from "./SiteCookiesTable.module.scss";
import useTranslation from "hooks/useTranslation";
import FormattedDate from "components/FormattedDate";
import {
  WITH_ACCENT_COLOR_ATTR,
  WITH_EXTERNAL_LINK_ATTR,
} from "constants/commonAttributes";
import Svg from "components/Svg";
import RootContainer from "core/RootContainer";

const cx = classNames(styles);

const SiteCookiesTable: FunctionComponent<ISiteCookiesTableProps> = ({
  cookies = [],
  updatedAt = "",
}) => {
  const { t, textDirection } = useTranslation();
  const trans = (key: string) => t(`declaration.used_cookies.${key}`);
  const unclassifiedDesc = trans("unclassified_desc");
  return (
    <div dir={textDirection}>
      <h2>{trans("heading")}</h2>
      <p>
        <b>{t("declaration.updated")}</b>
        &nbsp;
        <FormattedDate date={updatedAt || ""} />
      </p>
      {cookies.length === 0 && <p>---</p>}
      {cookies.length > 0 && (
        <div class={cx("tableContainer")}>
          <div class={cx("table-responsive-lg")}>
            <RootContainer>
              <Svg
                src={HandIcon}
                {...WITH_ACCENT_COLOR_ATTR}
                class={cx("icon")}
              />
            </RootContainer>
                {[...categories, UNCLASSIFIED].map((cat) => {
                  const categoryCookies = cookies.filter((i) => i.cat === cat);

                  // hide category if there are no cookies within this category
                  if (!categoryCookies.length) {
                    return NULL;
                  }

                  return (
                    <table key={cat} class={cx("cookiesTable", "table", "table-sm")}>
                      <caption class={cx('h3')} >{t(`categories.${cat}.title`)}</caption>
                        <tr>
                          <th scope="col">{trans("name")}</th>
                          <th scope="col">{trans("purpose")}</th>
                          <th scope="col">{trans("domain")}</th>
                          <th scope="col">{trans("expiration")}</th>
                          <th scope="col">{trans("provider")}</th>
                          <th scope="col">{trans("type")}</th>
                        </tr>
                        {categoryCookies.map((cookie) => (
                          <tr key={cookie.id}>
                            <th scope="row">{cookie.name}</th>
                            <td>{cookie.desc || unclassifiedDesc}</td>
                            <td>{cookie.domain}</td>
                            <td>{cookie.expiration_time}</td>
                            <td>
                              {!!cookie.q1 && !!cookie.q2 && (
                                <a href={cookie.q2} {...WITH_EXTERNAL_LINK_ATTR}>
                                  {cookie.q1}
                                </a>
                              )}
                              {!cookie.q1 || (!cookie.q2 && "---")}
                            </td>
                            <th scope="col">
                              {trans("type_" + cookie.type || "cookie")}
                            </th>
                          </tr>
                        ))}
                    </table>
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export interface ISiteCookiesTableProps {
  cookies: SiteCookie[];
  updatedAt: string;
}

export default SiteCookiesTable;
