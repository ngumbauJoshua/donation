export const ACTION_BUTTON_ACCEPT = "accept";
export const ACTION_BUTTON_SAVE = "save";
export const ACTION_BUTTON_REJECT = "reject";
export const ACTION_BUTTON_REJECT_SECOND = "reject_second";
export const ACTION_BUTTON_CUSTOMIZE = "adjust";
export const ACTION_BUTTON_CONTINUE = "continue";

export type ActionButton = |
  typeof ACTION_BUTTON_ACCEPT |
  typeof ACTION_BUTTON_SAVE |
  typeof ACTION_BUTTON_REJECT |
  typeof ACTION_BUTTON_REJECT_SECOND |
  typeof ACTION_BUTTON_CUSTOMIZE |
  typeof ACTION_BUTTON_CONTINUE;
