import { DropdownOption } from "./Dropdown";
import { type FunctionComponent } from "preact";
import IconCheck from "./icon-check.svg";
import classNames from "helpers/classNames";
import styles from "./Dropdown.module.scss";
import useTranslation from "hooks/useTranslation";
import { ENTER, SPACE } from "constants/keyboard";
import {
  WITH_BG_COLOR_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import includes from "helpers/includes";
import Svg from "components/Svg";

const cx = classNames(styles);

const DropdownItem: FunctionComponent<IDropdownItemProps> = ({
  item,
  onSelected,
  selected = false,
  ...props
}) => {
  const { textDirection } = useTranslation();
  const handleKeyDown = (e: KeyboardEvent) => {
    if (includes([ENTER, SPACE], e.key)) {
      onSelected(item);
    }
  };

  return (
    <div
      class={cx("dropdown-item", { selected })}
      {...WITH_BG_COLOR_ATTR}
      dir={textDirection}
      onClick={() => onSelected(item)}
    >
      <span
        {...props}
        {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
        {...WITH_TABINDEX_ATTR}
        role="option"
        aria-selected={!!selected}
        onKeyDown={handleKeyDown}
      >
        {!!selected && <Svg src={IconCheck} />}
        <span>{item.label}</span>
      </span>
    </div>
  );
};

export interface IDropdownItemProps {
  item: DropdownOption;
  selected?: boolean;
  onSelected: (item: DropdownOption) => void;
}

export default DropdownItem;
