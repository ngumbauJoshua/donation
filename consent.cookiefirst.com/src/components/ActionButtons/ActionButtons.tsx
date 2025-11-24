import Button, {
  BTN_LEVEL_LINK,
  BTN_LEVEL_PRIMARY,
  BTN_LEVEL_SECONDARY,
  IButtonProps,
} from "components/Button";
import useActionButtons, {
  ActionButtonsLocation,
  RejectButtonType,
} from "hooks/useActionButtons";

import { ACTION_ATTR } from "core/config";
import {
  ACTION_BUTTON_ACCEPT,
  ACTION_BUTTON_CONTINUE,
  ACTION_BUTTON_CUSTOMIZE,
  ACTION_BUTTON_REJECT,
  ACTION_BUTTON_REJECT_SECOND,
  ACTION_BUTTON_SAVE,
} from "constants/actionButtons";
import classNames from "helpers/classNames";
import styles from "./ActionButtons.module.scss";
import useAppState from "hooks/useAppState";
import useConsentActionButton from "constants/useConsentActionButton";
import useTranslation from "hooks/useTranslation";
import useUserConsent from "hooks/useUserConsent";
import { WITH_TABINDEX_ATTR } from "constants/commonAttributes";
import { NULL, TRUE } from "constants/primitives";
import { COL_12, COL_3, COL_4, COL_6, FORM_ROW, ROW } from "styles/bootstrap";
import { useState } from "preact/hooks";
import { type FunctionComponent } from "preact";

const cx = classNames(styles);

// some common classes as const to avoid repetition

const BUTTON_WIDTH_CLASSES = {
  "100%": [COL_12],
  "91.666%": [COL_12, "col-sm-11"],
  "83.333%": [COL_12, "col-sm-10"],
  "75%": [COL_12, "col-sm-9"],
  "66.666%": [COL_12, "col-sm-8"],
  "58.333%": [COL_12, "col-sm-7"],
  "50%": [COL_6],
  "41.666%": [COL_6, "col-sm-5"],
  "33.333%": [COL_6, "col-sm-4"],
  "25%": [COL_6, "col-xl-3"],
  "16.667%": [COL_4, "col-sm-3", "col-xl-2"],
  "8.333%": [COL_3, "col-sm-2", "col-xl-1"],
};

const ActionButtons: FunctionComponent<IActionButtonsProps> = ({
  alwaysAcceptAll,
  class: className,
  acceptLabel,
  acceptLabelAria,
  saveLabel,
  saveLabelAria,
  toggleSettingsLabel,
  toggleSettingsLabelAria,
  rejectLabel,
  rejectLabelAria,
  location,
  rejectBtnType,
}) => {
  const { widgetConfig, toggleSettingsPanel, isSettingsPanelOpen } =
    useAppState();
  const { acceptAll, acceptSelected, acceptDefault, deny } = useUserConsent();
  const actionButtons = useActionButtons(location, rejectBtnType);
  const { t, textDirection } = useTranslation();

  // This option is to determinate if settings panel was at least one opened, so we could automatically focus button that opened it on close of modal
  const [wasSettingsPanelOpened, setWasSettingsPanelOpened] = useState(false);

  const okAcceptsAll = alwaysAcceptAll || !!widgetConfig.okAcceptsAll;
  const denyBtn = widgetConfig.denyBtn;
  const denyBtnSecond = widgetConfig.denyBtnSecond;

  const acceptBtnProps = useConsentActionButton(
    okAcceptsAll ? acceptAll : acceptDefault
  );
  const acceptSelectionBtnProps = useConsentActionButton(acceptSelected);
  const rejectBtnProps = useConsentActionButton(deny);
  const rejectBtnSecondProps = useConsentActionButton(deny);

  const BUTTON_TYPE_PROPS: ButtonsPropsConfig = {
    [ACTION_BUTTON_ACCEPT]: {
      ...acceptBtnProps,
      level: BTN_LEVEL_PRIMARY,
      children: t(acceptLabel),
      title: t(acceptLabelAria),
    },
    [ACTION_BUTTON_SAVE]: {
      ...acceptSelectionBtnProps,
      level: BTN_LEVEL_PRIMARY,
      children: t(saveLabel),
      title: t(saveLabelAria),
    },
    [ACTION_BUTTON_REJECT]: {
      ...rejectBtnProps,
      level: denyBtn === "text" ? BTN_LEVEL_LINK : BTN_LEVEL_SECONDARY,
      children: t(rejectLabel),
      title: t(rejectLabelAria),
    },
    [ACTION_BUTTON_REJECT_SECOND]: {
      ...rejectBtnSecondProps,
      level: denyBtnSecond === "text" ? BTN_LEVEL_LINK : BTN_LEVEL_SECONDARY,
      children: t(rejectLabel),
      title: t(rejectLabelAria),
    },
    [ACTION_BUTTON_CUSTOMIZE]: {
      level: BTN_LEVEL_SECONDARY,
      onClick: () => {
        setWasSettingsPanelOpened(TRUE);
        toggleSettingsPanel(!isSettingsPanelOpen);
      },
      children: t(toggleSettingsLabel),
      title: t(toggleSettingsLabelAria),
    },
    [ACTION_BUTTON_CONTINUE]: {},
  };

  return (
    <div dir={textDirection} class={cx(className, "actions", ROW, FORM_ROW)}>
      {actionButtons.map((button, index) => {
        if (!BUTTON_TYPE_PROPS[button.value]) {
          return NULL;
        }

        const classes = [
          "action-col",
          ...(BUTTON_WIDTH_CLASSES[button.width] || [COL_6]),
        ];

        const btnProps = {
          ...BUTTON_TYPE_PROPS[button.value],
          [ACTION_ATTR]: button.value,
        };

        return (
          <div key={`button-${index}`} class={cx(...classes)}>
            <Button
              {...btnProps}
              {...WITH_TABINDEX_ATTR}
              aria-label={`${btnProps.title}`}
              shouldBeFocused={
                button.value === ACTION_BUTTON_CUSTOMIZE &&
                !isSettingsPanelOpen &&
                wasSettingsPanelOpened
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export interface IActionButtonsProps {
  alwaysAcceptAll?: boolean;
  class?: string;
  acceptLabel: string;
  acceptLabelAria: string;
  saveLabel: string;
  saveLabelAria: string;
  toggleSettingsLabel: string;
  toggleSettingsLabelAria: string;
  rejectLabel: string;
  rejectLabelAria: string;
  location: ActionButtonsLocation;
  rejectBtnType: RejectButtonType;
}

export type ButtonsPropsConfig = {
  [ACTION_BUTTON_ACCEPT]: IButtonProps;
  [ACTION_BUTTON_SAVE]: IButtonProps;
  [ACTION_BUTTON_REJECT]: IButtonProps;
  [ACTION_BUTTON_REJECT_SECOND]: IButtonProps;
  [ACTION_BUTTON_CUSTOMIZE]: IButtonProps;
  [ACTION_BUTTON_CONTINUE]: IButtonProps;
};

export default ActionButtons;
