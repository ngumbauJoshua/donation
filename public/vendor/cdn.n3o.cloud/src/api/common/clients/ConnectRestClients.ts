import { ConnectClient as AccountClient } from '@n3oltd/k2.accounts.sdk.connect'
import { ConnectClient as CartClient} from '@n3oltd/karakoram.cart.sdk.connect';
import { ConnectClient as CheckoutClient} from '@n3oltd/karakoram.checkout.sdk.connect';
import { ConnectClient, IApiHeaders } from '@n3oltd/karakoram.connect.sdk.connect';
import { DirectDebitUKClient } from '@n3oltd/karakoram.checkout.sdk.direct-debit-uk';
import { PayitClient } from "@n3oltd/karakoram.checkout.sdk.payit";
import { NetworkMerchantsClient } from '@n3oltd/karakoram.checkout.sdk.network-merchants';
import { ConnectClient as PlatformsClient } from '@n3oltd/karakoram.platforms.sdk.connect';
import { ConnectClient as SponsorshipClient } from '@n3oltd/karakoram.sponsorships.sdk.connect';

import ConnectApiClient from "./ConnectApiClient";
import AppManager from "./AppManager";
import { IConnectRestClients, IBaseUrlKeys, RestClient } from "./types";

export let _accountPublicClient: AccountClient | null = null;
export let _checkoutClient: CheckoutClient | null = null;
export let _cartClient: CartClient | null = null;
export let _directDebitUKClient: DirectDebitUKClient | null = null;
export let _connectClient: ConnectClient | null = null;
export let _networkMerchantsClient: NetworkMerchantsClient | null = null;
export let _payitFlowsPaymentsClient: PayitClient | null = null;
export let _platformsClient: PlatformsClient | null = null;
export let _sponsorshipClient: SponsorshipClient | null = null;

class ConnectRestClients implements IConnectRestClients {
  initialize() {
    _accountPublicClient = this.initRestClient<AccountClient>(AccountClient, 'accounts')
    _checkoutClient = this.initRestClient<CheckoutClient>(CheckoutClient, 'checkout')
    _cartClient = this.initRestClient<CartClient>(CartClient, 'cart')
    _directDebitUKClient = this.initRestClient<DirectDebitUKClient>(DirectDebitUKClient, 'checkout')
    _connectClient = this.initRestClient<ConnectClient>(ConnectClient, 'connect')
    _networkMerchantsClient = this.initRestClient<NetworkMerchantsClient>(NetworkMerchantsClient, 'checkout')
    _payitFlowsPaymentsClient = this.initRestClient<PayitClient>(PayitClient, 'checkout')
    _platformsClient = this.initRestClient<PlatformsClient>(PlatformsClient, 'platforms');
    _sponsorshipClient = this.initRestClient<SponsorshipClient>(SponsorshipClient, 'sponsorships');
  }

  initRestClient<T>(
    clientAPIType: any,
    apiUrlKey: IBaseUrlKeys,
    customConfiguration?: Partial<IApiHeaders>,
  ): T {

    return this.getRestClient(
      clientAPIType,
      this.baseUrlFor(apiUrlKey),
      customConfiguration,
    );
  }

  getRestClient = <T>(
    RestClientNew: RestClient<T>,
    clientBaseUrl: string,
    customConfiguration?: Partial<IApiHeaders>,
  ): T => {

    return new RestClientNew(
      { ...ConnectApiClient.defaultClientConfiguration, ...customConfiguration },
      clientBaseUrl,
    );
  };

  baseUrlFor(key: IBaseUrlKeys) {
    if (!AppManager.baseUrls)
      throw new Error("baseUrls haven't been initialized yet");

    const baseUrl: string = AppManager.baseUrls[key];

    return baseUrl;
  }
}

export default new ConnectRestClients();