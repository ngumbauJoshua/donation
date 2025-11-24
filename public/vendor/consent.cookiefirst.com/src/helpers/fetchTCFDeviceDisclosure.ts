import getJson from "./api/getJson";
import createPromise from "./createPromise";
import { coreLogger } from "./logger";
import { ITCFDeviceDisclosure as ITCFDeviceDisclosureResponse } from "types/tcf";

export const cachedDeviceDisclosures: {
  [vendorId: number]: ITCFDeviceDisclosureResponse;
} = {};
const fetchTCFDeviceDisclosure = (
  url: string,
  vendorId: number
): Promise<ITCFDeviceDisclosureResponse> => {
  return createPromise<ITCFDeviceDisclosureResponse>((resolve, reject) => {
    if (cachedDeviceDisclosures[vendorId]) {
      coreLogger(`Load cached vendors device disclosure: ${vendorId} `);
      return resolve(cachedDeviceDisclosures[vendorId]);
    }

    coreLogger("Load vendors device disclosure file from " + url);
    getJson(url).then(
      ([res]) => {
        coreLogger("Vendors device disclosure loaded");
        cachedDeviceDisclosures[vendorId] = res as ITCFDeviceDisclosureResponse;

        resolve(cachedDeviceDisclosures[vendorId]);
      },
      (e) => {
        coreLogger(new Error("Failed to load Vendors device disclosure List"));
        reject(e);
      }
    );
  });
};

export default fetchTCFDeviceDisclosure;
