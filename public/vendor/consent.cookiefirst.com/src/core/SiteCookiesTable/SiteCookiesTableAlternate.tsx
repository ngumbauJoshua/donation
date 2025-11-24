import { Fragment, type FunctionComponent, type RenderableProps } from "preact";
import { UNCLASSIFIED, categories } from "constants/categories";

import { NULL } from "constants/primitives";
import { SiteCookie } from "helpers/fetchSiteCookies";
import classNames from "helpers/classNames";
import styles from "./SiteCookiesTableAlternate.module.scss";
import useTranslation from "hooks/useTranslation";
import FormattedDate from "components/FormattedDate";
import { WITH_EXTERNAL_LINK_ATTR } from "constants/commonAttributes";
import { COL_12, COL_AUTO, ROW, TEXT_MEDIUM } from "styles/bootstrap";

const cx = classNames(styles);

const CookieAttribute = (props: RenderableProps<Record<string, unknown>>) => {
  return <div {...props} class={cx("attribute", COL_AUTO)} />;
};

const SiteCookiesTableAlternate: FunctionComponent<
  ISiteCookiesTableAlternateProps
> = ({ cookies = [], updatedAt = "" }) => {
  const { t, textDirection } = useTranslation();
  const trans = (key: string) => t(`declaration.used_cookies.${key}`);
  const unclassifiedDesc = trans("unclassified_desc");
  return (
    <>
      <p>
        <b>{t("declaration.updated")}</b>
        &nbsp;
        <FormattedDate date={updatedAt || ""} />
      </p>
      {[...categories, UNCLASSIFIED].map((cat) => {
        const categoryCookies = cookies.filter((i) => i.cat === cat);

        // hide category if there are no cookies within this category
        if (!categoryCookies.length) {
          return NULL;
        }
        return (
          <Fragment key={cat}>
            <div class={cx("categoryName")}>
              <h3>{t(`categories.${cat}.title`)}</h3>
            </div>
            <dl class={cx("cookiesTable")} dir={textDirection}>
              {categoryCookies.map((cookie) => {
                const { q1: providerName, q2: providerUrl } = cookie;
                return (
                  <div key={cookie.id} class={cx("cookie", ROW)}>
                    <dt class={cx(COL_12, TEXT_MEDIUM)}>{cookie.name}</dt>
                    <dd class={cx(COL_12)}>
                      <div className={cx(ROW)}>
                        <CookieAttribute>
                          {trans("domain")}: {cookie.domain}
                        </CookieAttribute>
                        <CookieAttribute>
                          {trans("expiration")}: {cookie.expiration_time}
                        </CookieAttribute>
                        <CookieAttribute>
                          {trans("type")}:{" "}
                          {trans("type_" + cookie.type || "cookie")}
                        </CookieAttribute>
                        {providerName && (
                          <CookieAttribute>
                            {trans("provider")}:&nbsp;
                            {providerUrl ? (
                              <a
                                href={providerUrl}
                                {...WITH_EXTERNAL_LINK_ATTR}
                              >
                                {providerName}
                              </a>
                            ) : (
                              providerName
                            )}
                          </CookieAttribute>
                        )}
                        <div class={cx("desc", COL_12)}>
                          {cookie.desc || unclassifiedDesc}
                        </div>
                      </div>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Fragment>
        );
      })}
    </>
  );
};

export interface ISiteCookiesTableAlternateProps {
  cookies: SiteCookie[];
  updatedAt: string;
}

export default SiteCookiesTableAlternate;
