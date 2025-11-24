import { FunctionComponent } from "preact";
import { ITCFDeviceDisclosure as ITCFDeviceDisclosureResponse } from "types/tcf";
import useTranslation from "hooks/useTranslation";
import { BORDER_OPACITY, COL, COL_4, COL_AUTO, ROW } from "styles/bootstrap";
import classNames from "helpers/classNames";
import styles from "./TCFDeviceDisclosure.module.scss";
import Button, { BTN_LEVEL_LINK } from "components/Button";
import useAppState from "hooks/useAppState";

const cx = classNames(styles);
const DAY_IN_SECONDS = 86400;

const TCFDeviceDisclosure: FunctionComponent<ITCFDeviceDisclosureProps> = ({
  item,
  onReload,
}) => {
  const { t } = useTranslation();
  const { gvl } = useAppState();
  const trans = (key: string) => t(`vendors.${key}`);

  const purposes = (purposes: number[]) => {
    return purposes.map((purpose) => {
      return gvl && `${gvl.purposes[purpose].name};`;
    });
  };

  const getTime = (seconds: number) => {
    const d = Math.floor(seconds / DAY_IN_SECONDS);

    return `${d} ${trans("days")}`;
  };

  return (
    <>
      {item &&
        item.disclosures &&
        item.disclosures.map((disclosure, index) => {
          return (
            <div
              key={`item-${index}`}
              class={cx("item", BORDER_OPACITY, "p-3")}
            >
              <div class={cx(ROW)}>
                <h6 class={cx(COL_4)}>{trans("identifier")}:</h6>
                <p class={cx(COL_AUTO)}>{disclosure.identifier}</p>
              </div>
              <div class={cx(ROW)}>
                <h6 class={cx(COL_4)}>{trans("type")}:</h6>
                <p class={cx(COL_AUTO)}>{disclosure.type}</p>
              </div>
              {disclosure.maxAgeSeconds && (
                <div class={cx(ROW)}>
                  <h6 class={cx(COL_4)}>{trans("lifespan")}</h6>
                  <p class={cx(COL_AUTO)}>
                    {getTime(disclosure.maxAgeSeconds)}
                  </p>
                </div>
              )}
              <div class={cx(ROW)}>
                <h6 class={cx(COL_4)}>{trans("cookie_refresh")}:</h6>
                <p class={cx(COL_AUTO)}>
                  {disclosure.cookieRefresh ? "yes" : "no"}
                </p>
              </div>
              <div class={cx(ROW)}>
                <h6 class={cx(COL_4)}>{trans("domain")}:</h6>
                <p class={cx(COL_AUTO)}>
                  {disclosure.domains &&
                    disclosure.domains.length > 0 &&
                    disclosure.domains.map((domain) => {
                      return <>{domain};</>;
                    })}
                  {disclosure.domain && disclosure.domain}
                </p>
              </div>
              <div class={cx(ROW)}>
                <h6 class={cx(COL_4)}>{trans("purposes")}:</h6>
                <p class={cx(COL)}>{purposes(disclosure.purposes)}</p>
              </div>
            </div>
          );
        })}
      {item &&
        item.domains &&
        item.domains.map((item, index) => {
          return (
            <div key={`item-${item.domain}-${index}`} class={cx("item", "p-3")}>
              <p>{item.domain}</p>
              <div class={cx(ROW)}>
                <p class={cx(COL_4)}>{trans("purposes")}:</p>
                <p class={cx(COL)}>{item.use}</p>
              </div>
            </div>
          );
        })}
      {!item && (
        <div class={cx("item", "p-3")}>
          <span class={cx("p-0", "m-0")}>
            {trans("device_disclosure_error")}{" "}
            <Button
              className={cx("p-0", "m-0")}
              childrenClasses={cx("p-0", "m-0")}
              level={BTN_LEVEL_LINK}
              aria-label={""}
              onClick={() => onReload()}
            >
              <h5>{trans("reload")}</h5>
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export interface ITCFDeviceDisclosureProps {
  item: ITCFDeviceDisclosureResponse | undefined;
  onReload: () => void;
}
export default TCFDeviceDisclosure;
