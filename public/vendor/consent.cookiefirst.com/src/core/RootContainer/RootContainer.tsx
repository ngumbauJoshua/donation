import { FALSE, NULL, TRUE } from "constants/primitives";
import { EMBED_ELEMENTS_PREFIX } from "core/config";
import classNames from "helpers/classNames";
import useAppState from "hooks/useAppState";
import useTranslation from "hooks/useTranslation";
import { type FunctionComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { IS_LEGACY_MODE } from "constants/modes";

const cx = classNames();

const RootContainer: FunctionComponent<IRootContainerProps> = ({
  isDialog = FALSE,
  children,
  rootClassName = "",
  forceHidden = FALSE,
}) => {
  const { t, textDirection, userLang } = useTranslation();
  const { widgetConfig, shouldBannerBeVisible } = useAppState();
  const [shouldBeOpen, setShouldBeOpen] = useState(FALSE);
  const dialog = useRef<HTMLDialogElement | null>(NULL);

  useEffect(() => {
    if (
      dialog.current &&
      isDialog &&
      !shouldBeOpen &&
      widgetConfig.focusBannerFirst
    ) {
      // Check if banner is already set as opened, this might happen when component re-render. In that case we don't want to reopen it via API to not change user focus position
      if (!shouldBeOpen) {
        dialog.current.focus({ preventScroll: TRUE });

        setShouldBeOpen(TRUE);
      }
    }
  }, [
    dialog,
    isDialog,
    widgetConfig.backdropEnabled,
    widgetConfig.focusBannerFirst,
    shouldBeOpen,
  ]);

  if (isDialog && !IS_LEGACY_MODE) {
    return (
      <dialog
        data-nosnippet // We add this to prevent Google from indexing the banner
        ref={dialog}
        class={cx(
          `${EMBED_ELEMENTS_PREFIX}-root`,
          "notranslate",
          rootClassName,
          { "d-none": forceHidden }
        )}
        lang={userLang}
        dir={textDirection}
        translate={false}
        aria-label={t("modal.acc_title")}
        aria-modal={TRUE}
        open={forceHidden ? FALSE : shouldBeOpen && shouldBannerBeVisible}
        // We add preventDefault on cancel, to prevent browser from thinking that it was close, when in reality it hasn't been closed.
        onCancel={(event) => event.preventDefault()}
      >
        {children}
      </dialog>
    );
  }

  return (
    <div
      data-nosnippet // We add this to prevent Google from indexing the banner
      class={cx(`${EMBED_ELEMENTS_PREFIX}-root`, "notranslate", rootClassName, {
        "d-none": forceHidden,
      })}
      lang={userLang}
      dir={textDirection}
      translate={false}
      aria-label={t("modal.acc_title")}
      aria-modal={TRUE}
    >
      {children}
    </div>
  );
};

export interface IRootContainerProps {
  isDialog?: boolean;
  rootClassName?: string;
  forceHidden?: boolean;
}

export default RootContainer;
