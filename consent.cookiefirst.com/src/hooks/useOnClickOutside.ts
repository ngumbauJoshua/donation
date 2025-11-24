import { useCallback, useEffect, useRef } from "preact/hooks";
import addEventListener from "helpers/dom/addEventListener";
import removeEventListener from "helpers/dom/removeEventListener";

import noop from "helpers/noop";
import { NULL } from "constants/primitives";

const useOnClickOutside = <Element extends HTMLElement>(
  callback: (e: MouseEvent | FocusEvent) => void | unknown = noop
) => {
  const ref = useRef<Element | null>(NULL);

  const onClickOutsideHandler = useCallback(
    (e: MouseEvent | FocusEvent) => {
      // when the clicked element is not inside the target ref
      if (
        e.target &&
        ref.current &&
        !ref.current.contains(e.target as Node | null)
      ) {
        // call the callback function with the event
        callback(e);
      }
    },
    [callback]
  );

  useEffect(() => {
    addEventListener(window, "click", onClickOutsideHandler);
    return () => {
      removeEventListener(window, "click", onClickOutsideHandler);
    };
  }, [onClickOutsideHandler]);

  return [ref];
};

export default useOnClickOutside;
