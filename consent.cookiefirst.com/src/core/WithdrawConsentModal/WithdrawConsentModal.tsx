import Button, { BTN_LEVEL_SECONDARY } from "components/Button";
import { type FunctionComponent } from "preact";
import Modal from "components/Modal";
import MultilineText from "components/MultilineText";
import PoweredBy from "components/PoweredBy";
import classNames from "helpers/classNames";
import styles from "./WithdrawConsentModal.module.scss";
import useTranslation from "hooks/useTranslation";
import useUserConsent from "hooks/useUserConsent";
import { TEXT_BOLD, TEXT_END } from "styles/bootstrap";

const cx = classNames(styles);

const WithdrawConsentModal: FunctionComponent<IWithdrawConsentModalProps> = ({
  onClose,
  ...props
}) => {
  const { t, textDirection } = useTranslation();
  const { handleWithdraw, isWithdrawing } = useUserConsent();
  const trans = (key: string) => t("withdraw." + key);

  return (
    <Modal {...props} toggle={isWithdrawing ? undefined : onClose}>
      <div class={cx("mb-3", TEXT_BOLD)}>{trans("title")}</div>
      <div class={cx("mb-3", "text")}>
        <MultilineText text={trans("text")} />
      </div>
      <div class={cx("mt-3", "actions")}>
        <Button
          loading={isWithdrawing}
          disabled={isWithdrawing}
          className={cx("mr-1")}
          dir={textDirection}
          onClick={() => handleWithdraw()}
        >
          {trans("confirm")}
        </Button>
        <Button
          level={BTN_LEVEL_SECONDARY}
          disabled={isWithdrawing}
          onClick={onClose}
        >
          {trans("cancel")}
        </Button>
      </div>
      <div class={cx(TEXT_END, "mt-3")}>
        <PoweredBy />
      </div>
    </Modal>
  );
};

export interface IWithdrawConsentModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default WithdrawConsentModal;
