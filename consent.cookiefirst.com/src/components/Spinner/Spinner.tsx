import { type FunctionComponent } from "preact";
import classNames from "helpers/classNames";
import styles from "./Spinner.module.scss";
import { WITH_ACCENT_COLOR_ATTR } from "constants/commonAttributes";

const cx = classNames(styles);

const Spinner: FunctionComponent<ISpinnerProps> = ({
  class: className,
  ...props
}) => (
  <div {...props} {...WITH_ACCENT_COLOR_ATTR} class={cx(className, "loader")}>
    Loading...
  </div>
);

export interface ISpinnerProps {
  class?: string;
}

export default Spinner;
