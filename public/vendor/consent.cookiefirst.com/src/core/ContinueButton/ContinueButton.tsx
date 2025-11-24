import Button, {
  BTN_LEVEL_LINK,
  BTN_LEVEL_PRIMARY,
  BTN_LEVEL_SECONDARY,
} from "components/Button";
import CloseIcon from "components/CloseIcon";
import {
  CONTINUE_BTN_STYLE_BUTTON_PRIMARY,
  CONTINUE_BTN_STYLE_BUTTON_SECONDARY,
  CONTINUE_BTN_STYLE_LINK,
  CONTINUE_BTN_STYLE_X_BTN,
  CONTINUE_BTN_STYLE_X_BTN_SECONDARY,
  CONTINUE_BTN_STYLE_X_ONLY,
} from "types/config-files/mainConfig";
import classNames from "helpers/classNames";
import includes from "helpers/includes";
import styles from "./ContinueButton.module.scss";
import { useMemo } from "preact/hooks";
import useTranslation from "hooks/useTranslation";
import { UNDEFINED } from "constants/primitives";
import { FunctionComponent } from "preact";

const cx = classNames(styles);

const ContinueButton: FunctionComponent<IContinueButtonProps> = ({
  className,
  type,
  ...btnProps
}) => {
  const { t, userLang } = useTranslation();
  const textContent = t("widget.buttons.continueButton");
  const closeContent = t("widget.buttons.closeButton");

  const continueButtonContent = useMemo(() => {
    if (
      includes(
        [
          CONTINUE_BTN_STYLE_X_BTN,
          CONTINUE_BTN_STYLE_X_BTN_SECONDARY,
          CONTINUE_BTN_STYLE_X_ONLY,
        ],
        type
      )
    ) {
      return <CloseIcon />;
    }

    if (type === CONTINUE_BTN_STYLE_LINK) {
      return closeContent;
    }

    return textContent;
  }, [type, userLang, t]);

  const calcLevel = useMemo(() => {
    if (includes([CONTINUE_BTN_STYLE_LINK, CONTINUE_BTN_STYLE_X_ONLY], type)) {
      return BTN_LEVEL_LINK;
    }

    if (
      type === CONTINUE_BTN_STYLE_BUTTON_PRIMARY ||
      type === CONTINUE_BTN_STYLE_X_BTN
    ) {
      return BTN_LEVEL_PRIMARY;
    } else if (
      type === CONTINUE_BTN_STYLE_BUTTON_SECONDARY ||
      type === CONTINUE_BTN_STYLE_X_BTN_SECONDARY
    ) {
      return BTN_LEVEL_SECONDARY;
    }
  }, [type]);

  return (
    <Button
      {...btnProps}
      className={cx(type, "closeBtn", className)}
      title={t("widget.buttons.continueButtonLabel")}
      aria-label={`${t("widget.buttons.continueButtonLabel")}`}
      level={calcLevel || UNDEFINED}
    >
      {continueButtonContent}
    </Button>
  );
};

export interface IContinueButtonProps {
  type?: string;
  className?: string;
}

export default ContinueButton;
