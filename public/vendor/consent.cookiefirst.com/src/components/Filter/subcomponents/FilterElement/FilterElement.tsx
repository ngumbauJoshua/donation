import { type FunctionComponent } from "preact";
import classNames from "helpers/classNames";
import styles from "./FilterElement.module.scss";
import { IFilterElement } from "components/Filter";
import Checkbox from "components/Checkbox";

const cx = classNames(styles);

const FilterElement: FunctionComponent<IFilterElementComp> = ({ className, id, label, category, isVisible, onChange }) => {
  return (
    <span class={`${cx('d-flex')} ${className}`}>
      <Checkbox
        checked={isVisible}
        onChange={() => { onChange({ id, label, category, isVisible }) }}
        label={label}
      />
    </span>
  );
};

interface IFilterElementComp extends IFilterElement {
  onChange: ({ id, label, category, isVisible }: IFilterElement) => void
  className?: string,
}
export default FilterElement;
