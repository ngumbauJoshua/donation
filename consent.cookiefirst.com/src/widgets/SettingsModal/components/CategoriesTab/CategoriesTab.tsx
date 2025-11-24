import CategorySettings from "components/CategorySettings";
import { CookieCategory } from "types/consent";
import { NECESSARY, IAB_PURPOSES, ADVERTISING } from "constants/categories";
import useAppState from "hooks/useAppState";
import useTranslation from "hooks/useTranslation";
import useUserConsent from "hooks/useUserConsent";
import includes from "helpers/includes";
import useTCFDynamicImport from "hooks/useTCFDynamicImport";
import { TEXT_MEDIUM } from "styles/bootstrap/commonClasses";
import classNames from "helpers/classNames";
import styles from "./CategoriesTab.module.scss";

const cx = classNames(styles);
const CategoriesTab = () => {
  const { t } = useTranslation();
  const { widgetConfig } = useAppState();
  const { TCFPurposeSettings } = useTCFDynamicImport(widgetConfig);
  const { isCategoryAccepted, toggleCategory } = useUserConsent();
  const {
    widgetConfig: { scripts, cookieCategories, tcfEnabled },
  } = useAppState();

  const trans = (cat: CookieCategory, key: string) => {
    return t("categories." + cat + "." + key);
  };
  return (
    <>
      {tcfEnabled && (
        <>
          {TCFPurposeSettings && <TCFPurposeSettings />}
          <div class={cx("mb-2", TEXT_MEDIUM)}>
            <h3>{t(`${IAB_PURPOSES}.non_iab`)}</h3>
          </div>
        </>
      )}
      {cookieCategories.map((cat, index) => {
        const isAlwaysAccepted = cat === NECESSARY;
        const isAccepted = isCategoryAccepted(cat);

        const categoryScripts = scripts.filter((i) =>
          includes(i.categories, cat)
        );

        return (
          <CategorySettings
            key={index}
            disabled={isAlwaysAccepted}
            title={trans(cat, "title")}
            excerpt={trans(cat, "excerpt")}
            description={trans(cat, "description")}
            descriptionSuffix={
              cat === ADVERTISING ? t("widget.heading.suffix") : ""
            }
            scripts={categoryScripts}
            isAccepted={isAlwaysAccepted || isAccepted}
            onToggle={() => toggleCategory(cat, !isAccepted)}
          />
        );
      })}
    </>
  );
};

export default CategoriesTab;
