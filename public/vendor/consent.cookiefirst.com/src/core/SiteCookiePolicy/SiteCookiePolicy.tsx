import { UNCLASSIFIED } from "constants/categories";
import { useMemo } from "preact/hooks";

import { FALSE, TRUE } from "constants/primitives";
import FormattedDate from "components/FormattedDate";
import { type FunctionComponent } from "preact";
import MultilineText from "components/MultilineText";
import { SiteCookie } from "helpers/fetchSiteCookies";
import integrationSettings from "core/integrationSettings";
import useAppState from "hooks/useAppState";
import useTranslation from "hooks/useTranslation";
import useUserConsent from "hooks/useUserConsent";
import { WITH_OUTLINE_ACCENT_COLOR_ATTR } from "constants/commonAttributes";
import isArray from "helpers/isArray";
import { CookieCategory } from "types/consent";
import classNames from "helpers/classNames";
import styles from "./SiteCookiePolicy.module.scss";
import { TEXT_MEDIUM } from "styles/bootstrap/commonClasses";

const cx = classNames(styles);

const SiteCookiePolicy: FunctionComponent<ISiteCookiePolicyProps> = ({
  updatedAt = "",
  visitorId = "",
  cookies = [],
  hideButtons = FALSE,
}) => {
  const { t, textDirection } = useTranslation();
  const trans = (key: string) => t(`declaration.${key}`);
  const transManageConsent = (key: string) => trans(`manage_consent.${key}`);
  const { stealthMode } = integrationSettings;
  const { hasConsented, consentTimestamp, toggleWithdrawModal } =
    useUserConsent();
  const { widgetConfig, changePanelTab } = useAppState();
  const USED_CATEGORIES = useMemo(() => {
    const hasUnclassified =
      isArray(cookies) && !!cookies.find((i) => i.cat === UNCLASSIFIED);
    const cats = [...widgetConfig.cookieCategories] as Array<
      CookieCategory | typeof UNCLASSIFIED
    >;
    if (hasUnclassified) {
      cats.push(UNCLASSIFIED);
    }

    return cats;
  }, [cookies, widgetConfig]);

  return (
    <>
      {!!trans("updated") && (
        // don't show updated text if translation is empty
        <p>
          <b>{trans("updated")}</b>
          &nbsp;
          <FormattedDate date={updatedAt} />
        </p>
      )}

      {["what_are_cookies", "why_cookies"].map((section) => (
        <>
          <div class={cx("mb-2", TEXT_MEDIUM)}>
            <h3>{trans(`${section}.heading`)}</h3>
          </div>
          <MultilineText text={trans(`${section}.text`)} />
        </>
      ))}
      <div class={cx("mb-2", TEXT_MEDIUM)}>
        <h3>{trans("cookie_types.heading")}</h3>
      </div>
      {USED_CATEGORIES.map((category) => (
        <>
          <div class={cx("my-2", TEXT_MEDIUM)}>
            <h4>{trans(`cookie_types.${category}.heading`)}</h4>
          </div>
          <MultilineText text={trans(`cookie_types.${category}.text`)} />
        </>
      ))}

      <div class={cx("mb-2", TEXT_MEDIUM)}>
        <h3>{trans("disable_cookies.heading")}</h3>
      </div>
      <MultilineText text={trans("disable_cookies.text")} />

      {!!hasConsented && !hideButtons && (
        <>
          <MultilineText text={transManageConsent("heading")} />
          <p>
            {!stealthMode && (
              <button
                {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
                type="button"
                onClick={() => changePanelTab()}
              >
                {transManageConsent("change")}
              </button>
            )}
            <button
              {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
              type="button"
              onClick={() => toggleWithdrawModal(TRUE)}
            >
              {transManageConsent("withdraw")}
            </button>
          </p>
        </>
      )}

      {!!visitorId && (
        <>
          <p>{transManageConsent("your_id")}:</p>
          <p>
            <strong>{visitorId}</strong>
          </p>
          <p>{transManageConsent("view_consents")}</p>
        </>
      )}

      {!!hasConsented && !!consentTimestamp && (
        <p>
          {transManageConsent("consent_datetime")}:{" "}
          <strong>
            <FormattedDate
              date={new Date(consentTimestamp * 1000).toISOString()}
            />
          </strong>
        </p>
      )}
    </>
  );
};

export interface ISiteCookiePolicyProps {
  hideButtons?: boolean;
  updatedAt: string;
  visitorId: string;
  cookies: SiteCookie[];
}

export default SiteCookiePolicy;
