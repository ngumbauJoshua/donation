import { type ComponentChild, type FunctionComponent } from "preact";

import { NULL } from "constants/primitives";
import classNames from "helpers/classNames";
import styles from "./Tabs.module.scss";
import { useMemo, useRef } from "preact/hooks";
import useTranslation from "hooks/useTranslation";
import randomString from "helpers/randomString";
import {
  WITH_ACCENT_COLOR_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_NEGATIVE_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import { BORDER_OPACITY, TEXT_BOLD } from "styles/bootstrap";
import { NUMBER_0, NUMBER_1 } from "constants/numbers";

const cx = classNames(styles);

const Tabs = <TabType,>({
  tabs = [],
  tabContentClassName = "",
  currentTab,
  onChange,
  ...props
}: ITabsProps<TabType>) => {
  const { textDirection } = useTranslation();
  const tabsRef = useRef<[HTMLButtonElement] | []>([]);

  const tabsIds = useMemo(
    () => tabs.map((tab) => tab.key + "-" + randomString()),
    [tabs]
  );

  const activeTab = useMemo(() => {
    if (!currentTab) {
      const firstTab = tabs[0];
      return firstTab ? firstTab.key || NULL : NULL;
    }

    return currentTab;
  }, [tabs, currentTab]);

  /**
   * Function to handle navigation between elements in tabs nav with keyboard arrows
   */
  const handleKeyInteraction = (event: KeyboardEvent, tabKey: number) => {
    let newTabKey: number;
    switch (event.key) {
      case "Up":
      case "ArrowUp":
      case "Left":
      case "ArrowLeft":
        newTabKey =
          tabKey === NUMBER_0 ? tabs.length - NUMBER_1 : tabKey - NUMBER_1;

        onChange(tabs[newTabKey].key);
        tabsRef.current[newTabKey].focus();
        break;

      case "Down":
      case "ArrowDown":
      case "Right":
      case "ArrowRight":
        newTabKey =
          tabKey === tabs.length - NUMBER_1 ? NUMBER_0 : tabKey + NUMBER_1;

        onChange(tabs[newTabKey].key);
        tabsRef.current[newTabKey].focus();
        break;
    }
  };

  return (
    <>
      {/* Additional container div needed for correct flexbox layout. Without it the buttons are smaller than their text */}
      {tabs.length > 1 && (
        <div>
          <div class={cx("tabs")} dir={textDirection}>
            {tabs.map((tab, index) => (
              <button
                {...(tab.key === activeTab ? WITH_ACCENT_COLOR_ATTR : {})}
                {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
                {...WITH_TABINDEX_ATTR}
                {...(tab.key === activeTab
                  ? WITH_TABINDEX_ATTR
                  : WITH_TABINDEX_NEGATIVE_ATTR)}
                key={tab.key}
                type="button"
                ref={(element) => {
                  if (element) tabsRef.current[index] = element;
                }}
                role="tab"
                aria-selected={tab.key === activeTab}
                id={tabsIds[index]}
                aria-controls={tabsIds[index] + "-tab"}
                onClick={() => onChange(tab.key)}
                class={cx("tabBtn", BORDER_OPACITY, TEXT_BOLD)}
                onKeyDown={(e) => {
                  handleKeyInteraction(e, index);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div class={cx("tab-content", tabContentClassName)}>
        {tabs.map((tab, index) => {
          if (tab.disabled) {
            return NULL;
          }

          const isActive = tab.key === activeTab;
          return (
            <div
              key={index}
              role="tabpanel"
              id={tabsIds[index] + "-tab"}
              aria-labelledby={tabsIds[index]}
              class={cx("tab-pane", { active: isActive })}
            >
              {isActive && <tab.component {...WITH_TABINDEX_ATTR} {...props} />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export interface ITab<TabType> {
  component: FunctionComponent<Record<string, unknown>>;
  disabled?: boolean;
  key: TabType;
  label: ComponentChild;
}
export interface ITabsProps<TabType> {
  tabs: ITab<TabType>[];
  tabContentClassName?: string;
  currentTab: TabType | null;
  onChange: (newTab: TabType) => void;
  dir?: string;
}

export default Tabs;
