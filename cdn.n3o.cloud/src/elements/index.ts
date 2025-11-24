import { CheckoutElementWrapper } from "@/wrappers/CheckoutElementWrapper";
import { CartItemsCounterWrapper } from "@/wrappers/CartItemsCounter"
import { DonationButtonWrapper } from "@/wrappers/DonationButtonWrapper";
import { DonationFormModalWrapper } from "@/wrappers/DonationFormModalWrapper";
import { DonationFormInlineWrapper } from "@/wrappers/DonationFormInlineWrapper";
import { Wrapper as ContributionsWrapper } from '@/wrappers/ContributionsWrapper';
import { Wrapper as GoalProgressWrapper } from '@/wrappers/GoalProgressWrapper';

import { AnalyticsService } from "@/services/AnalyticsService";
import { r2wcStyled } from "./styledWCWrapper";
import { initializeSonner } from "@/utils/sonner/sonner-init";

initializeSonner();
AnalyticsService.captureAll();

function init(){
  const body = document.getElementsByTagName("body")[0];
  if (!body) {
    return;
  };
  
  const element = document.querySelector("n3o-donation-form-modal");

  if (element) {
    return;
  }

  const modal = document.createElement("n3o-donation-form-modal");
  body.appendChild(modal);
}

init();


const CheckoutComponent = r2wcStyled(CheckoutElementWrapper, { 
  shadow: "open", 
  props: {
    open: "boolean",
    legacy: "boolean",
    onClose: 'function',
    onError: 'function',
  }
}) as any;
customElements.define("n3o-checkout", CheckoutComponent);

const CartItemsCounterComponent = r2wcStyled(CartItemsCounterWrapper, { 
  shadow: "open",
}) as any;
customElements.define("n3o-cart-items-count", CartItemsCounterComponent);

const DonationComponent = r2wcStyled(DonationButtonWrapper, { 
  shadow: "open", 
  props: {
    amount: 'number',
    currency: 'string',
    label: 'string',
    dataConfig: 'json',
    uiConfig: 'json',
    preview: 'boolean',
    json: 'string',
  }
}) as any;
customElements.define("n3o-donate-button", DonationComponent);

const DonationFormModalComponent = r2wcStyled(DonationFormModalWrapper, { 
  shadow: "open", 
  props: {
    onClose: 'function',
    className: 'string',
    preview: 'boolean',
    json: 'string',
  }
}) as any;
customElements.define("n3o-donation-form-modal", DonationFormModalComponent);

const DonationFormComponent = r2wcStyled(DonationFormInlineWrapper, { 
  shadow: "open", 
  props: {
    formId: 'string',
    dataConfig: 'json',
    uiConfig: 'json',
    preview: 'boolean',
    json: 'string',
  }
}) as any;
customElements.define("n3o-donation-form", DonationFormComponent);

const ContributionsComponent = r2wcStyled(ContributionsWrapper, { 
  shadow: "open", 

}) as any;
customElements.define("n3o-contributions", ContributionsComponent);

const GoalProgressComponent = r2wcStyled(GoalProgressWrapper, { 
  shadow: "open", 

}) as any;
customElements.define("n3o-goal-progress", GoalProgressComponent);