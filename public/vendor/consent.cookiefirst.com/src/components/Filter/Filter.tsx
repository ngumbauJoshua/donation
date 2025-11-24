import { type FunctionComponent } from "preact";
import classNames from "helpers/classNames";
import styles from "./Filter.module.scss";
import { useCallback, useState } from "preact/hooks";
import IconFilter from "./IconFilter.svg";
import { BORDER_OPACITY, D_NONE } from "styles/bootstrap";
import {
  WITH_BG_COLOR_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import Svg from "components/Svg";
import useOnClickOutside from "hooks/useOnClickOutside";
import useTranslation from "hooks/useTranslation";
import FilterCategory from "components/Filter/subcomponents/FilterCategory";
import FilterElement from "./subcomponents/FilterElement";
import { FALSE } from "constants/primitives";

const cx = classNames(styles);

const Filter: FunctionComponent<IFilterProps> = ({ elements, callback }) => {
  const { textDirection } = useTranslation();
  const [isFiltersExpanded, setExpandedFilters] = useState(FALSE);

  const handleClickOutside = useCallback(() => {
    if (isFiltersExpanded) {
      setExpandedFilters(FALSE);
    }
  }, [isFiltersExpanded, setExpandedFilters]);

  const [toggleContainerRef] =
    useOnClickOutside<HTMLDivElement>(handleClickOutside);

  const handleOnChange = ({ id, category, isVisible }: IFilterElement) => {
    if (callback && typeof callback === "function")
      callback({ id, category, isVisible });
  };

  return (
    <div dir={textDirection} class={cx("wrap")}>
      <button
        {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
        {...WITH_TABINDEX_ATTR}
        class={cx("button", "position-relative", BORDER_OPACITY)}
        onClick={() => setExpandedFilters(!isFiltersExpanded)}
      >
        <Svg className={cx("icon")} src={IconFilter} />
      </button>
      <div
        {...WITH_BG_COLOR_ATTR}
        class={cx({ [D_NONE]: !isFiltersExpanded }, "options")}
        ref={toggleContainerRef}
      >
        {elements &&
          elements.map((element) => {
            // Check if element is category, or should already be rendered
            return "values" in element ? (
              <FilterCategory {...element} onChange={handleOnChange} />
            ) : (
              <FilterElement {...element} onChange={handleOnChange} />
            );
          })}
      </div>
    </div>
  );
};

export interface IFilterProps {
  elements?: IFilterElement[] | IFilterCategory[];
  callback?: ({ id, label, category, isVisible }: IFilterElement) => void;
}

export type IFilterCategory = {
  id: string;
  label: string;
  values: IFilterElement[];
};

export type IFilterElement = {
  id: string;
  label?: string;
  category?: string;
  isVisible: boolean;
};

export default Filter;
