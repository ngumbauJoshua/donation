import { type FunctionComponent } from "preact";
import classNames from "helpers/classNames";
import styles from "./FilterCategory.module.scss";
import { IFilterCategory, IFilterElement } from "components/Filter";
import FilterElement from "../FilterElement";
import { TEXT_BOLD } from "styles/bootstrap";

const cx = classNames(styles);

const FilterCategory: FunctionComponent<IFilterCategoryComp> = ({
  label,
  values,
  onChange,
}) => {
  return (
    <div class={cx("category")}>
      <span class={cx("d-block", "mb-2", TEXT_BOLD)}>{label}</span>
      <div>
        <>
          {values.map((element, index) => (
            <FilterElement
              key={`filter-element-${index}`}
              className={cx("element")}
              {...element}
              onChange={onChange}
            />
          ))}
        </>
      </div>
    </div>
  );
};

interface IFilterCategoryComp extends IFilterCategory {
  onChange: ({ id, label, category, isVisible }: IFilterElement) => void;
}

export default FilterCategory;
