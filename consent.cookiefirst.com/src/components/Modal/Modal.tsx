import classNames from "helpers/classNames";
import CloseIcon from "components/CloseIcon";
import { FALSE, NULL } from "constants/primitives";
import { type FunctionComponent } from "preact";
import noop from "helpers/noop";
import { WIDGET_ATTR } from "core/config";
import styles from "./Modal.module.scss";
import { useEffect, useMemo, useRef } from "preact/hooks";
import useTranslation from "hooks/useTranslation";
import { _DOCUMENT_ } from "constants/dom";
import addEventListener from "helpers/dom/addEventListener";
import removeEventListener from "helpers/dom/removeEventListener";
import {
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import includes from "helpers/includes";
import { createPortal } from "helpers/portals";
import RootContainer from "core/RootContainer";
import stopEvent from "helpers/stopEvent";
import useAppState from "hooks/useAppState";
import randomIntString from "helpers/randomIntString";
import { IS_LEGACY_MODE } from "constants/modes";

const cx = classNames(styles);

let OPEN_INSTANCES: string[] = [];

const handleMount = (instanceId: string) => {
  if (OPEN_INSTANCES.length === 0) {
    _DOCUMENT_.body.classList.add(cx("modal-open"));
  }

  if (!includes(OPEN_INSTANCES, instanceId)) {
    OPEN_INSTANCES.push(instanceId);
  }
};
const handleUnmount = (instanceId: string) => {
  // handle unmount called 2 times on modal close
  if (!includes(OPEN_INSTANCES, instanceId)) {
    return;
  }

  OPEN_INSTANCES = OPEN_INSTANCES.filter((i) => i !== instanceId);
  if (OPEN_INSTANCES.length === 0) {
    _DOCUMENT_.body.classList.remove(cx("modal-open"));
  }
};

const Modal: FunctionComponent<IModalProps> = ({
  children = NULL,
  isOpen = FALSE,
  toggle = noop,
  ariaLabelId = undefined,
}) => {
  const instanceId = useMemo(() => `id${randomIntString()}`, []);
  const dialogRef = useRef<HTMLDialogElement>(NULL);
  const { t, textDirection } = useTranslation();
  const { widgetConfig } = useAppState();

  // keep track of how many modals are open to correctly toggle body class name
  useEffect(() => {
    const cleanUp = () => {
      handleUnmount(instanceId);
    };

    if (isOpen && !IS_LEGACY_MODE) {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
      handleMount(instanceId);
    } else {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
      cleanUp();
    }

    return cleanUp;
  }, [isOpen]);

  const resetPerspective = useMemo(() => {
    return (
      window
        .getComputedStyle(document.body, NULL)
        .getPropertyValue("perspective") !== "none"
    );
  }, []);

  // handle click on backdrop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (!dialog) {
        return;
      }

      const dialogDimensions = dialog.getBoundingClientRect();
      const clickX = e.clientX;
      const clickY = e.clientY;

      if (
        clickX < dialogDimensions.left ||
        clickX > dialogDimensions.right ||
        clickY < dialogDimensions.top ||
        clickY > dialogDimensions.bottom
      ) {
        // If clicked outside, try another test, in order to determinate if clicked element is inside banner-root because click via keyboard will return 0:0 in coordinates giving false result in coordinate check.
        if (e.target instanceof Element) {
          // We check for parentElement because function "closest" return clicked element as well.
          if (
            !(
              e.target.parentElement &&
              e.target.parentElement.closest(`#${instanceId}`)
            )
          ) {
            toggle();
          }
        } else {
          toggle();
        }
      }
    };

    addEventListener(dialog, "click", handleClickOutside);

    return () => {
      removeEventListener(dialog, "click", handleClickOutside);
    };
  }, [toggle, instanceId]);

  // don't render until modal is opened
  if (!isOpen) {
    return NULL;
  }

  const ModalTag = IS_LEGACY_MODE ? "div" : "dialog";

  return createPortal(
    <>
      <ModalTag
        id={instanceId}
        // @ts-expect-error - Ignore error from ts, because with that check for sure there will be right ref type. But typescript have issue with it anyway
        ref={!IS_LEGACY_MODE ? dialogRef : undefined}
        class={cx(
          "dialog",

          {
            resetPerspective,
          },
          IS_LEGACY_MODE ? "isLegacy" : NULL,
          widgetConfig.tcfEnabled ? "tcfModal" : NULL
        )}
        aria-labelledby={ariaLabelId}
        aria-modal="true"
        onClose={(e) => {
          stopEvent(e);

          // trigger onClose callback in case dialog was closed by browser without changing isOpen prop
          // this can happen if there is a form with method="dialog" inside or user clicked ESC key
          if (isOpen) {
            toggle();
          }
        }}
        style={`--banner-backdrop-color: ${widgetConfig.backdropColor}`}
      >
        <div className={cx("content")}>
          <RootContainer>
            <div
              {...{ [WIDGET_ATTR]: "modal" }}
              {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
              class={cx("modal")}
            >
              <div class={cx("modalContent")}>
                <div class={cx("modalBody")}>
                  <button
                    class={cx("close")}
                    onClick={toggle}
                    dir={textDirection}
                    aria-label={t("modal.buttons.close")}
                    {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
                    {...WITH_TABINDEX_ATTR}
                  >
                    <CloseIcon />
                  </button>
                  {children}
                </div>
              </div>
            </div>
          </RootContainer>
        </div>
      </ModalTag>
    </>,
    _DOCUMENT_.body
  );
};

export interface IModalProps {
  ariaLabelId?: string;
  toggle?: () => void;
  isOpen?: boolean;
}

export default Modal;
