import { CookieCategory } from "types/consent";
import { type FunctionComponent } from "preact";
import { IConfigFileScript } from "types/config-files/mainConfig";
import type { ITCFGatpVendor } from "types/tcf";
import Switch from "components/Switch";
import classNames from "helpers/classNames";
import noop from "helpers/noop";
import styles from "./VendorSettings.module.scss";
import useTranslation from "hooks/useTranslation";
import { WITH_CORNER_STYLE_ATTR, WITH_EXTERNAL_LINK_ATTR, WITH_TABINDEX_ATTR } from "constants/commonAttributes";
import { BORDER_OPACITY, TEXT_BOLD, TEXT_LG } from "styles/bootstrap";
import { useCallback, useMemo } from "preact/hooks";

const cx = classNames(styles);

const VendorSettings: FunctionComponent<IVendorSettingsProps> = ({
  title = "",
  disabled,
  isAccepted,
  script,
  onToggle = noop,
}) => {
  const { t } = useTranslation();
  const trans = useCallback((cat: CookieCategory, key: string) => {
    return t("categories." + cat + "." + key);
  }, [t]);

  const isScript = (obj: IConfigFileScript | ITCFGatpVendor): obj is IConfigFileScript => {
    return 'categories' in obj;
  }

  const prepareMarkup = useMemo(() => {
    if (isScript(script)) {
      return script.categories.map((cat) => trans(cat, "title")).join(", ")
    } else {
      return script.policy_url && (
        <a
          href={script.policy_url}
          {...WITH_TABINDEX_ATTR}
          {...WITH_EXTERNAL_LINK_ATTR}
          aria-label={`${title} ${t('modal.view_policies_label')}`}
        >
          {t('vendors.view_policies')}
        </a>
      )
    }
  }, [script, t, trans, title]);

  return (
    <div {...WITH_CORNER_STYLE_ATTR} class={cx("serviceSettings", 'd-flex', BORDER_OPACITY)}>
      <div class={cx("serviceMeta", TEXT_BOLD)}>
        <div class={cx("py-2", TEXT_LG)}>
          <h4>{title}</h4>
        </div>
        <div class={cx("categories")}>
          {prepareMarkup}
        </div>
      </div>
      <div class={cx("toggle")}>
        <Switch
          disabled={disabled}
          checked={!!isAccepted}
          onChange={onToggle}
          aria-label={title}
        />
      </div>
    </div>
  );
};

export interface IVendorSettingsProps {
  title: string;
  disabled: boolean;
  isAccepted?: boolean;
  script: IConfigFileScript | ITCFGatpVendor;
  onToggle: () => void;
}

export default VendorSettings;
