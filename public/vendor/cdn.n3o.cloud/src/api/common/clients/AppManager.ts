import apiConfig, { ApiConfig } from "../config/ApiConfig";
import { IEnvironmentContext } from "../contexts/EnvironmentProvider";
import ConnectRestClients from "./ConnectRestClients";

export default class AppManager {
  public static readonly DefaultLocaleKey = "defaultLocalLanguage";
  public static defaultLocale: string = 'en';
  public static isProductionEnv: boolean = true;
  public static baseUrls: { [key: string]: string } = {};

  private static constructBaseUrls(apiConfig: ApiConfig, basePath: string) {
    const baseUrls: { [key: string]: string } = {};
    Object.entries(apiConfig.endpoints).forEach(([key, value]) => {
      if (value.match(/localhost/)) {
        baseUrls[key] = value;
      } else {
        // e.g. "https://beta.n3o.cloud" + "/eu1/" + "api/accounts"
        baseUrls[key] = `${apiConfig.host}${basePath}${value}`;
      }
    });

    return baseUrls;
  }

  public static initialize(env: IEnvironmentContext) {
    this.defaultLocale = (navigator?.languages?.[1]) || 'en';


    const environmentName = env.environment;
    if (environmentName !== "prod") {
      this.isProductionEnv = false;
    }

    this.baseUrls = this.constructBaseUrls(
      apiConfig[environmentName],
      env.basePath,
    );

    ConnectRestClients.initialize();
  }
}
