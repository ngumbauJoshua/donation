import { NULL } from "constants/primitives";
import fetchWrapper from "helpers/api/fetch";
import includes from "helpers/includes";
import isValidHtml from "helpers/isValidHtml";
import report from "helpers/report";
import { type JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import classNames from "helpers/classNames";
import styles from "./Svg.module.scss";

const cx = classNames(styles);

const MIME_TYPE = "image/svg+xml";
const ERROR = "invalid svg";
const Svg = ({ src, class: className, ...props }: ISvgProps) => {
  const [code, setCode] = useState<string | null>(NULL);

  useEffect(() => {
    if (!src) {
      return;
    }

    setCode(NULL);
    fetchWrapper(src)
      .then(([res]) => {
        if (includes(res.headers.get("content-type") || "", MIME_TYPE)) {
          return res.text();
        }

        throw new Error(ERROR);
      })
      .then((svg) => {
        if (isValidHtml(svg, MIME_TYPE)) {
          setCode(svg);
        } else {
          throw new Error(ERROR);
        }
      })
      .catch(report);
  }, [src]);

  if (!src || !code) {
    return NULL;
  }

  return (
    <span
      {...props}
      class={cx(className, "svg")}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
};

interface ISvgProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  src: string;
  class?: string;
}

export default Svg;
