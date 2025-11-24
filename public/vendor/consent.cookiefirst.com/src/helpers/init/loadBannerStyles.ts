import { _DOCUMENT_ } from "constants/dom";

import { ConfigFilesVersion } from "types/config-files/mainConfig";
import { NULL } from "constants/primitives";
import WidgetConfig from "./WidgetConfig";
import getStaticFileUrl from "helpers/getStaticFileUrl";
import integrationSettings from "core/integrationSettings";
import loadCSSFile from "helpers/init/loadCSSFile";
import trim from "helpers/trim";
import includes from "helpers/includes";
import createPromise from "helpers/createPromise";
import { LOGS_PREFIX } from "core/config";

const loadBannerStyles = (
  version: ConfigFilesVersion,
  widgetConfig: WidgetConfig
) => {
  const { dir } = integrationSettings;
  return createPromise<string>((resolve, reject) => {
    loadCSSFile(getStaticFileUrl(`${dir}/styles.css`, version)).then(
      (cssContent) => {
        // detect if body is using the same font as banner
        const widgetFont = widgetConfig.fontFamily;
        if (widgetFont) {
          const bodyFontFamily = window
            .getComputedStyle(_DOCUMENT_.body, NULL)
            .getPropertyValue("font-family");

          const bodyFonts = bodyFontFamily
            .split(",")
            .map((i) => trim(trim(i, '"'), "'"));

          // if it's using the same font use our css
          if (includes(bodyFonts, widgetFont)) {
            return resolve(cssContent);
          }

          loadCSSFile(getStaticFileUrl(`${dir}/fonts.css`, version)).then(
            (fontsCssContent) => {
              const fullCssContent = fontsCssContent + " " + cssContent;
              return resolve(fullCssContent);
            },
            () => {
              resolve(cssContent);
            }
          );
        } else {
          return resolve(cssContent);
        }
      },
      () => {
        reject(new Error(`${LOGS_PREFIX} Failed to load banner styles`));
      }
    );
  });
};

export default loadBannerStyles;
