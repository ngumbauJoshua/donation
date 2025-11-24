import { Environment } from "../contexts/EnvironmentProvider";

export type CdnConfig = {
  host: string;
};

export type CdnConfigs = {
  [key in Environment]: CdnConfig;
};

export const cdnConfig: CdnConfigs = {
  prod: {
    host: "https://cdn.n3o.cloud"
  },
  staging: {
    host: "https://cdn-staging.n3o.cloud"
  },
  qa: {
    host: "https://cdn-beta.n3o.cloud"
  },
  development: {
    host: "https://cdn-beta.n3o.cloud"
   
  },
};
