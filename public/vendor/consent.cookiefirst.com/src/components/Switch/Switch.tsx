import { type FunctionComponent, type JSX } from "preact";

import classNames from "helpers/classNames";
import styles from "./Switch.module.scss";
import { useCallback } from "preact/hooks";
import {
  WITH_ACCENT_COLOR_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import useTranslation from "hooks/useTranslation";

const cx = classNames(styles);

const Switch: FunctionComponent<ISwitchProps> = ({
  onChange,
  checked,
  disabled,
  label,
  className,
  ...props
}) => {
  const handleChange = useCallback(() => onChange(), [onChange]);
  const { textDirection } = useTranslation();

  return (
    <button
      {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
      {...WITH_TABINDEX_ATTR}
      {...WITH_ACCENT_COLOR_ATTR}
      {...props}
      disabled={disabled}
      onClick={handleChange}
      className={`${
        label ? cx("wrapper", "d-flex") : cx("button", { checked })
      } ${className}`}
      role="checkbox"
      aria-checked={checked}
      dir={textDirection}
    >
      {label ? (
        <>
          <span className={cx("mr-3", "label")} dir={textDirection}>
            {label}
          </span>
          <span className={cx("button", "m-0", { checked })}>
            <span className={cx("toggle")}></span>
          </span>
        </>
      ) : (
        <span className={cx("toggle")}></span>
      )}
    </button>
  );
};

export interface ISwitchProps
  extends Omit<JSX.IntrinsicElements["button"], "checked" | "onChange"> {
  onChange: () => void;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
}

export default Switch;
