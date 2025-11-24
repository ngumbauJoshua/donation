import { _DOCUMENT_ } from "constants/dom";
import createElement from "helpers/dom/createElement";

const insertCSSContents = (content: string) => {
  if (!content) {
    return;
  }
  const elem = createElement("style");
  elem.innerHTML = content;
  elem.id = "consent-custom-styles";
  // append styles to body to fix async-loaded css files overriding them
  _DOCUMENT_.body.appendChild(elem);
};

export default insertCSSContents;
