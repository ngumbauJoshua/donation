
import { CONTEXT_OUTSIDE_PROVIDER } from "constants/errors";
import { useContext } from "preact/hooks";
import { ITCFConsentContext, TCF_USER_CONSENT_CONTEXT } from "helpers/tcf/TCFConsentProvider/TCFUserConsentContext";

const useTCFUserConsent = (): ITCFConsentContext => {
  const ctx = useContext(TCF_USER_CONSENT_CONTEXT);
  if (!ctx) {
    throw new Error(CONTEXT_OUTSIDE_PROVIDER);
  }

  return ctx;
};

export default useTCFUserConsent;
