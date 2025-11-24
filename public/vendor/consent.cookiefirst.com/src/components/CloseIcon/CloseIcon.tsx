import classNames from "helpers/classNames";
import { type FunctionComponent } from "preact";
import styles from "./CloseIcon.module.scss";

const cx = classNames(styles);

const CloseIcon: FunctionComponent = () => {
  return <span class={cx("icon")} />;
};

export default CloseIcon;
