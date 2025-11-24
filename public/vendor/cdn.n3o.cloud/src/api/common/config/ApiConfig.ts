import { Environment } from "../contexts/EnvironmentProvider";

export type ApiConfig = {
  host: string;
  endpoints: {
    [key: string]: string;
  };
};

export type ApiConfigs = {
  [key in Environment]: ApiConfig;
};

export const Endpoints = {
    accounts: "accounts",
    checkout: "api/checkout",
    elements: "api/elements",
    cart: "api/cart",
    connect: "api/connect",
    platforms: "api/platforms",
    sponsorships: "api/sponsorships",
};

const apiConfig: ApiConfigs = {
  prod: {
    host: "https://api.n3o.cloud",
    endpoints: {...Endpoints},
  },
  staging: {
    host: "https://api-staging.n3o.cloud",
    endpoints: {...Endpoints},
  },
  qa: {
    host: "https://api-beta.n3o.cloud",
    endpoints: {...Endpoints},
  },
  development: {
    host: "https://api-beta.n3o.cloud",
    endpoints: {...Endpoints}
   
  },
};

export default apiConfig;
