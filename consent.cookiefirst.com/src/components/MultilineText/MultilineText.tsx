import includes from "helpers/includes";
import isValidHtml from "helpers/isValidHtml";
import trim from "helpers/trim";
import classNames from "helpers/classNames";
import { type FunctionComponent, type JSX } from "preact";
import { useMemo } from "preact/hooks";
import styles from "./MultilineText.module.scss";

const cx = classNames(styles);

type AllowedTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type ElementConfig = [AllowedTag, string];
const ALLOWED_TAGS: AllowedTag[] = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];

const MultilineText: FunctionComponent<IMultilineTextProps> = ({
  text = "",
  blockClasses,
  ...props
}) => {
  const elements = useMemo<ElementConfig[]>(() => {
    if (!trim(text) || !isValidHtml(text)) {
      return [["p", text]];
    }

    const doc = new DOMParser().parseFromString(text, "text/html");
    const children = Array.from(doc.body.children)
      .map((child) => {
        return [child.nodeName.toLowerCase(), child.innerHTML] as ElementConfig;
      })
      .filter(([tag]) => includes(ALLOWED_TAGS, tag));

    return children;
  }, [text]);

  return (
    <div class={cx("text", blockClasses)}>
      {elements.map(([Tag, __html], index) => (
        <Tag
          key={`tag-${index}`}
          {...props}
          dangerouslySetInnerHTML={{ __html }}
        />
      ))}
    </div>
  );
};

interface IMultilineTextProps extends JSX.HTMLAttributes {
  text: string;
  blockClasses?: string[];
}

export default MultilineText;
