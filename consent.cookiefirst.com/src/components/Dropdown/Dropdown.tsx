import { FALSE, NULL, TRUE } from "constants/primitives";
import { type FunctionComponent, type JSX } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

import DropdownItem from "./DropdownItem";
import IconDown from "./icon-down.svg";
import classNames from "helpers/classNames";
import noop from "helpers/noop";
import styles from "./Dropdown.module.scss";
import useOnClickOutside from "hooks/useOnClickOutside";
import { DOWN, ENTER, ESCAPE, SPACE, UP } from "constants/keyboard";
import {
  WITH_ACCENT_COLOR_ATTR,
  WITH_BG_COLOR_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
} from "constants/commonAttributes";
import includes from "helpers/includes";
import stopEvent from "helpers/stopEvent";
import Svg from "components/Svg";
import useTranslation from "hooks/useTranslation";

const cx = classNames(styles);
const OPTION_SELECTOR = '[role="option"]';

const getOptionByValue = (
  options: DropdownOption[],
  defaultValue: string | null
) => {
  if (options.length === 0) {
    return {
      value: "en",
      label: "English",
    };
  }

  const option = options.find((item) => item.value === defaultValue);
  return option || options[0];
};

const Dropdown: FunctionComponent<IDropdownProps> = ({
  options = [],
  defaultValue = "en",
  value = "",
  onChange = noop,
  menuClassName = "",
  ...props
}) => {
  const { textDirection } = useTranslation();
  const dropdownContainerRef = useRef<HTMLDivElement | null>(NULL);
  const dropdownToggleRef = useRef<HTMLDivElement | null>(NULL);
  const [isOpen, setIsOpen] = useState(FALSE);
  const [selected, setSelected] = useState(
    getOptionByValue(options, defaultValue)
  );
  const handleToggle = () => setIsOpen((state) => !state);

  const handleClickOutside = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, setIsOpen]);

  const [toggleContainerRef] =
    useOnClickOutside<HTMLDivElement>(handleClickOutside);

  const handleKeyDownToggle = (
    e: JSX.TargetedKeyboardEvent<HTMLSpanElement>
  ) => {
    if (includes([ENTER, SPACE], e.key)) {
      stopEvent(e, TRUE);
      handleToggle();
    }
  };

  const handleOptionSelected = (option: DropdownOption) => {
    setSelected(option);
    handleToggle();
    onChange(option.value);
  };

  useEffect(() => {
    if (value !== selected.value) {
      setSelected(getOptionByValue(options, value));
      setIsOpen(FALSE);
    }
  }, [value, options, selected]);

  // focus first option when dropdown is opened
  useEffect(() => {
    if (isOpen && dropdownContainerRef.current) {
      const option =
        dropdownContainerRef.current.querySelector<HTMLElement>(
          OPTION_SELECTOR
        );
      if (option) {
        option.focus();
      }
    }
  }, [isOpen]);

  // handle switching of options with arrow keys and closing on esc key press
  const handleKeyDown = (e: KeyboardEvent) => {
    const dropdown = dropdownContainerRef.current;
    if (!dropdown) {
      return;
    }

    if (e.key === ESCAPE) {
      setIsOpen(FALSE);
      // focus dropdown toggle after closing with esc key
      if (dropdownToggleRef.current) {
        dropdownToggleRef.current.focus();
      }
    }

    if (!includes([UP, DOWN], e.key)) {
      return;
    }

    stopEvent(e, TRUE);
    const currentOption = dropdown.querySelector<HTMLElement>(
      `${OPTION_SELECTOR}:focus`
    );
    const allOptions = Array.from(
      dropdown.querySelectorAll<HTMLElement>(OPTION_SELECTOR)
    );
    const currentOptionIndex = allOptions.findIndex(
      (opt) => opt === currentOption
    );
    const lastOptionIndex = allOptions.length - 1;
    let nextOption: HTMLElement | null = NULL;
    if (e.key === UP) {
      if (currentOptionIndex <= 0) {
        nextOption = allOptions[lastOptionIndex];
      } else {
        nextOption = allOptions[currentOptionIndex - 1];
      }
    } else if (e.key === DOWN) {
      if (currentOptionIndex === lastOptionIndex) {
        nextOption = allOptions[0];
      } else {
        nextOption = allOptions[currentOptionIndex + 1];
      }
    }

    if (nextOption) {
      nextOption.focus();
    }
  };

  return (
    <div
      ref={dropdownContainerRef}
      class={cx("dropdown")}
      onKeyDown={handleKeyDown}
    >
      <div
        {...props}
        class={cx("dropdown-toggle")}
        onClick={handleToggle}
        role="button"
        aria-haspopup="listbox"
        onKeyDown={handleKeyDownToggle}
        {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
        {...WITH_ACCENT_COLOR_ATTR}
      >
        <span>{selected.label}</span>
        <Svg src={IconDown} />
      </div>
      <div
        class={cx(menuClassName, "dropdown-menu", {
          opened: isOpen,
          closed: !isOpen,
        })}
        dir={textDirection}
        {...WITH_BG_COLOR_ATTR}
        role="listbox"
        ref={toggleContainerRef}
      >
        <div class={cx("dropdown-item-wrapper")}>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              item={option}
              onSelected={handleOptionSelected}
              selected={selected.value === option.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export type DropdownOption = {
  value: string;
  label: string;
};

export interface IDropdownProps
  extends Omit<JSX.HTMLAttributes, "value" | "defaultValue" | "onChange"> {
  options: DropdownOption[];
  defaultValue: string | null;
  value: string | null;
  onChange: (value: string) => void;
  menuClassName?: string;
}

export default Dropdown;
