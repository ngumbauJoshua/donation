import {
  BORDER_OPACITY,
  TEXT_BOLD,
  TEXT_LG,
  TEXT_NOWRAP,
} from "styles/bootstrap";
import {
  WITH_ACCENT_COLOR_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import classNames from "helpers/classNames";
import styles from "./Accordion.module.scss";
import { FunctionComponent } from "preact";
import { JSX } from "preact";
import { useState } from "preact/hooks";
import { FALSE, TRUE } from "constants/primitives";
import { CORNER_STYLE_ATTR } from "core/config";
import Button, { BTN_LEVEL_LINK } from "components/Button";
import IconDown from "components/Dropdown/IconDown";
import noop from "helpers/noop";
import useTranslation from "hooks/useTranslation";

const cx = classNames(styles);

const Accordion: FunctionComponent<IAccordion> = ({
  title,
  switcher,
  link,
  badge,
  children,
  fragment,
  titleTag: TitleTag = "span",
  onExpand = noop,
  customSwitcher,
}) => {
  const [isExpanded, setExpanded] = useState(FALSE);
  const { t, textDirection } = useTranslation();

  const expand = () => {
    setExpanded(!isExpanded);
    onExpand(!isExpanded);
  };

  const isColumnVisible = !!badge || !!fragment || !!link;

  return (
    <div
      {...{ [CORNER_STYLE_ATTR]: TRUE }}
      class={cx("accordion", BORDER_OPACITY)}
    >
      <div class={cx("header")}>
        <div class={cx("row", "justify-content-between")}>
          <div class={cx("col")}>
            <Button
              level={BTN_LEVEL_LINK}
              onClick={() => expand()}
              childrenClasses={cx(TEXT_LG, TEXT_BOLD)}
            >
              <div class={cx("title")}>
                <TitleTag>{title}</TitleTag>
              </div>
            </Button>
          </div>
          <div class={cx("d-flex", "col-2", "justify-content-end")}>
            <Button
              {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
              {...WITH_TABINDEX_ATTR}
              {...WITH_ACCENT_COLOR_ATTR}
              level="link"
              className={cx("caret", "d-flex", { isActive: isExpanded })}
              onClick={() => expand()}
              aria-expanded={isExpanded}
              aria-label={`${t("modal.see_more_about")}: ${title}`}
            >
              <span class={cx("arrow", "d-flex")}>
                <IconDown />
              </span>
            </Button>
          </div>
        </div>
        <div class={cx("row", "justify-content-between")}>
          {isColumnVisible && (
            <div class={cx("col", "pr-0")}>
              {!!badge && (
                <p
                  dir={textDirection}
                  class={cx(
                    "mt-1",
                    "badge",
                    "p-1",
                    "mb-0",
                    TEXT_BOLD,
                    TEXT_NOWRAP
                  )}
                >
                  {badge}
                </p>
              )}
              {(!!fragment || !!link) && (
                <div class={cx("description", { "mt-2": !!badge })}>
                  {!!fragment && fragment}
                  {!!link && link}
                </div>
              )}
            </div>
          )}
          <div
            dir={textDirection}
            class={cx(
              "d-flex",
              {
                "col-auto": isColumnVisible,
                col: !isColumnVisible,
              },
              "justify-content-center",
              "toggle"
            )}
          >
            {!!switcher && !customSwitcher && switcher}
            {customSwitcher && customSwitcher}
          </div>
        </div>
      </div>
      <div class={cx("body", { "d-none": !isExpanded })}>{children}</div>
    </div>
  );
};

export interface IAccordion {
  title: string;
  badge?: string | null;
  switcher?: JSX.Element | null;
  customSwitcher?: JSX.Element | null;
  link?: JSX.Element | string;
  fragment?: JSX.Element;
  titleTag?: JSX.ElementType;
  onExpand?: (value: boolean) => void;
}

export default Accordion;
