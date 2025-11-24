import bsCSSModule from "styles/bootstrap";
import clsx, { ClassValue } from "clsx";
import { JSX } from "preact";

// helper function to bind css modules styles from bootstrap and component in one convenient function
// usage:
// import classNames from 'helpers/classNames';
// import styles from './styles.scss';
// const cx = classNames(styles)
// <div class={cx('col-md-6', 'componentClassName')} />

type Argument = ClassValue | JSX.HTMLAttributes["className"];
type Mapping = Record<string, string>;

function bind(styles: Mapping = {}) {
  return function (...args: Argument[]) {
    let i = 0;
    let arr = [];
    let out = "";
    const tmp = clsx(args);

    if (tmp) {
      for (arr = tmp.split(" "); i < arr.length; i++) {
        if (out) {
          out += " ";
        }
        const original = arr[i];
        out += styles[original] || original;
      }
    }

    return out;
  };
}

const cls = (styles: Mapping = {}) => {
  return bind({ ...bsCSSModule, ...styles });
};

export default cls;
