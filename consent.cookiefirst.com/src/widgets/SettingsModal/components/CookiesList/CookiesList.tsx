import { type FunctionComponent } from "preact";
import MultilineText from "components/MultilineText";
import SiteCookiesTable from "core/SiteCookiesTable";
import Spinner from "components/Spinner";
import classNames from "helpers/classNames";
import styles from "./CookiesList.module.scss";
import useLoadSiteCookies from "hooks/useLoadSiteCookies";
import useTranslation from "hooks/useTranslation";

const cx = classNames(styles);

const CookiesList: FunctionComponent = () => {
  const { t } = useTranslation();
  const [scan, isLoadingScan] = useLoadSiteCookies();

  if (isLoadingScan) {
    return <Spinner />;
  }

  return (
    <div class={cx("cookiesList")}>
      <MultilineText text={t("modal.tabIntro")} />
      <SiteCookiesTable
        layout="alternate"
        cookies={scan.cookies}
        updatedAt={scan.cookie_list_updated_at}
      />
    </div>
  );
};

export default CookiesList;
