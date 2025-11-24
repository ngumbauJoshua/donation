import { type FunctionComponent } from "preact";
import classNames from "helpers/classNames";
import styles from "./Backdrop.module.scss";

const cx = classNames(styles);

const Backdrop: FunctionComponent<IBackdropProps> = ({ show }) => (
  <div class={cx("modal-backdrop", { show })} />
);

export interface IBackdropProps {
  show: boolean;
}

export default Backdrop;
