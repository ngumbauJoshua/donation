import { BUTTON_ATTR } from "core/config";
import { NULL, UNDEFINED } from "constants/primitives";

import { type FunctionComponent } from "preact";
import { IGeneralButtonProps } from "./types";
import Spinner from "components/Spinner";
import classNames from "helpers/classNames";
import styles from "./Button.module.scss";
import {
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import isString from "helpers/isString";
import { TEXT_LG } from "styles/bootstrap";
import { useEffect, useRef } from "preact/hooks";

const cx = classNames(styles);
const STYLE_VARIABLE_PREFIX = "--banner-btn";
const STYLE_VARIABLES = [
  "border-color",
  "bg",
  "text",
  "border-radius",
  "hover-border-color",
  "hover-bg",
  "hover-text",
  "hover-border-radius",
];

export const BTN_LEVEL_PRIMARY = "primary";
export const BTN_LEVEL_SECONDARY = "secondary";
export const BTN_LEVEL_LINK = "link";

const Button: FunctionComponent<IButtonProps> = ({
  level = BTN_LEVEL_PRIMARY,
  type = "button",
  loading,
  children,
  className,
  childrenAttr,
  childrenClasses,
  shouldBeFocused,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement | null>(NULL);

  useEffect(() => {
    if (shouldBeFocused && ref.current) {
      ref.current.focus();
    }
  }, [shouldBeFocused]);

  return (
    <button
      {...props}
      {...WITH_TABINDEX_ATTR}
      {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
      {...{ [BUTTON_ATTR]: level }}
      type={type}
      ref={ref}
      disabled={!!loading}
      class={`${className ? className : ""} ${cx("button", TEXT_LG, {
        link: level === "link",
      })}`}
      aria-label={
        props["aria-label"]
          ? props["aria-label"]
          : isString(children)
          ? children
          : UNDEFINED
      }
      style={STYLE_VARIABLES.reduce(
        (agg, variable) => ({
          ...agg,
          [`${STYLE_VARIABLE_PREFIX}-${variable}`]: `var(${STYLE_VARIABLE_PREFIX}-${level}-${variable})`,
        }),
        {}
      )}
    >
      {!!loading && <Spinner class={cx("spinner")} />}
      <span
        {...childrenAttr}
        class={`${childrenClasses ? childrenClasses : ""} ${cx("content")}`}
      >
        {children}
      </span>
    </button>
  );
};

export interface IButtonProps extends IGeneralButtonProps {
  level?:
    | typeof BTN_LEVEL_PRIMARY
    | typeof BTN_LEVEL_SECONDARY
    | typeof BTN_LEVEL_LINK;
  type?: "button" | "submit";
  childrenAttr?: { [key: string]: boolean };
  childrenClasses?: string;
  additionalClasses?: string;
  shouldBeFocused?: boolean;
  disabled?: boolean;
}

export default Button;
