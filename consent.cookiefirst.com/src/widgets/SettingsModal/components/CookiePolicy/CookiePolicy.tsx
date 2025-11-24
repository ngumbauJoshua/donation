import SiteCookiePolicy from "core/SiteCookiePolicy";
import classNames from "helpers/classNames";
import styles from "./CookiePolicy.module.scss";
import EmbedContainer from "core/EmbedContainer";

const cx = classNames(styles);

const CookiePolicy = () => {
  return (
    <EmbedContainer>
      {({ scan }) => (
        <div class={cx("policy")}>
          <SiteCookiePolicy
            hideButtons
            visitorId={scan.visitor_id}
            updatedAt={scan.cookie_policy_updated_at}
            cookies={scan.cookies}
          />
        </div>
      )}
    </EmbedContainer>
  );
};

export default CookiePolicy;
