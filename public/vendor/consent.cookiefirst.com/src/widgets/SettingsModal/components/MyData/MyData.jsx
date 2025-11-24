import Button from "components/Button";
import FormattedDate from "components/FormattedDate";
import MultilineText from "components/MultilineText";
import Spinner from "components/Spinner";
import classNames from "helpers/classNames";
import styles from "./MyData.module.scss";
import useLoadSiteCookies from "hooks/useLoadSiteCookies";
import useTranslation from "hooks/useTranslation";
import useUserConsent from "hooks/useUserConsent";
// import { useState } from "preact/hooks";
// import useIssueRemoveDataRequest from "hooks/useIssueRemoveDataRequest";
// import IssueRemoveDataRequestModal from "core/IssueRemoveDataRequestModal";

const cx = classNames(styles);

const MyData = () => {
  const { t } = useTranslation();
  const [scan, isLoadingScan] = useLoadSiteCookies();
  const { hasConsented, consentTimestamp, handleWithdraw, isWithdrawing } =
    useUserConsent();
  // const [isIssuingRDR] = useIssueRemoveDataRequest();
  // const [isShowingIssueRDRModal, setIsShowingIssueRDRModal] = useState(false);
  const trans = (key) => t(`declaration.manage_consent.${key}`);

  if (isLoadingScan) {
    return <Spinner />;
  }

  return (
    <div class={cx("data")}>
      {!scan.visitor_id && !hasConsented && <p>{trans("no_data")}</p>}
      {!!scan.visitor_id && (
        <div class={cx("section")}>
          <p>{trans("your_id")}:</p>
          <p>
            <strong>{scan.visitor_id}</strong>
          </p>
          <p>{trans("view_consents")}</p>
        </div>
      )}

      {!!hasConsented && !!consentTimestamp && (
        <div class={cx("section")}>
          <p>{trans("consent_datetime")}:</p>
          <p>
            <strong>
              <FormattedDate
                date={new Date(consentTimestamp * 1000).toISOString()}
              />
            </strong>
          </p>
        </div>
      )}
      {!!hasConsented && (
        <div class={cx("section")}>
          <p class={cx("heading")}>{t("withdraw.mydata_title")}</p>
          <div class={cx("mb-3")}>
            <MultilineText text={t("withdraw.text")} />
          </div>
          <Button
            loading={isWithdrawing}
            disabled={isWithdrawing}
            className={cx("withdraw-btn")}
            onClick={handleWithdraw}
          >
            {t("withdraw.confirm")}
          </Button>
          {/* <Button
            loading={isIssuingRDR}
            class={cx("mt-3", "remove-data-request-btn")}
            onClick={() => {
              setIsShowingIssueRDRModal(true);
            }}
          >
            {t("remove_data_request_modal.button_label")}
          </Button> */}
          {/* <IssueRemoveDataRequestModal
            isOpen={isShowingIssueRDRModal}
            onClose={() => {
              setIsShowingIssueRDRModal(false);
            }}
          /> */}
        </div>
      )}
    </div>
  );
};

export default MyData;
