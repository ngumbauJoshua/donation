import { type FunctionComponent, type JSX } from "preact";

import classNames from "helpers/classNames";
import styles from "./Checkbox.module.scss";
import { useCallback } from "preact/hooks";
import {
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import useTranslation from "hooks/useTranslation";

const cx = classNames(styles);

const Checkbox: FunctionComponent<ISwitchProps> = ({
  onChange,
  checked,
  disabled,
  label,
  ...props
}) => {
  const { textDirection } = useTranslation();
  const handleChange = useCallback(() => onChange(), [onChange]);

  return (
    <>
      <button
        {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
        {...WITH_ACCENT_COLOR_ATTR}
        {...WITH_TABINDEX_ATTR}
        {...props}
        id={label}
        disabled={disabled}
        onClick={handleChange}
        class={cx("button", { checked }, "mr-2")}
        dir={textDirection}
        role="checkbox"
        aria-checked={checked}
      />
      <label class={cx("label")} htmlFor={label}>
        {label}
      </label>
    </>
  );
};

export interface ISwitchProps
  extends Omit<JSX.HTMLAttributes, "checked" | "onChange"> {
  onChange: () => void;
  checked?: boolean;
  label: string;
  disabled?: boolean;
}

export default Checkbox;
