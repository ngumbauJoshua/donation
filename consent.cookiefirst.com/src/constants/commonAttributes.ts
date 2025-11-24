import { ACCENT_COLOR_ATTR, CORNER_STYLE_ATTR, OUTLINE_ACCENT_COLOR_ATTR, BG_COLOR_ATTR, WIDGET_ATTR, BUTTON_ATTR, ACTION_ATTR, CATEGORY_ATTR } from "core/config";
import { TRUE } from "./primitives";

// styling attributes
export const WITH_ACCENT_COLOR_ATTR = { [ACCENT_COLOR_ATTR]: TRUE };
export const WITH_CORNER_STYLE_ATTR = { [CORNER_STYLE_ATTR]: TRUE };
export const WITH_OUTLINE_ACCENT_COLOR_ATTR = { [OUTLINE_ACCENT_COLOR_ATTR]: TRUE };
export const WITH_BG_COLOR_ATTR = { [BG_COLOR_ATTR]: TRUE };
export const WITH_WIDGET_ATTR = { [WIDGET_ATTR]: TRUE };
export const WITH_BUTTON_ATTR = { [BUTTON_ATTR]: TRUE };
export const WITH_ACTION_ATTR = { [ACTION_ATTR]: TRUE };
export const WITH_CATEGORY_ATTR = { [CATEGORY_ATTR]: TRUE };

// tabIndex
export const WITH_TABINDEX_ATTR = {
  tabIndex: 0
}

export const WITH_TABINDEX_NEGATIVE_ATTR = {
  tabIndex: -1
}

// external link attributes
export const WITH_EXTERNAL_LINK_ATTR = {
  target: "_blank",
  rel: "noopener noreferrer"
}
