import {
  createContext,
  FC,
  ReactNode,
  useContext,
} from "react";
import { Region, regions } from "../config/regions";

export type Environment = "prod" | "qa" | "staging" | "development";

function getRegion(): Region {
  let selectedRegion = regions[0];

  regions.forEach((region) => {
    if (window.location.pathname.match(region)) {
      selectedRegion = region;
    }
  });

  return selectedRegion;
}

export interface IEnvironmentContext {
  loaded: boolean;
  environment: Environment;
  region: Region;
  basePath: string;
}

const defaultEnvironment: IEnvironmentContext = {
  loaded: false,
  environment: 'development',
  region: getRegion(),
  basePath: `/${getRegion()}/`,
};

export const EnvironmentContext = createContext<IEnvironmentContext>(
  defaultEnvironment,
);

export const useEnvironmentContext = () => useContext(EnvironmentContext);

const EnvironmentProvider: FC<{children: ReactNode, environment: Environment}> = ({ children, environment }) => {

  return (
    <EnvironmentContext.Provider
      value={{
        loaded: true,
        environment: environment,
        region: defaultEnvironment.region,
        basePath: defaultEnvironment.basePath,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export default EnvironmentProvider;
