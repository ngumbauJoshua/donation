import fetchTCFDeviceDisclosure, {cachedDeviceDisclosures} from "helpers/fetchTCFDeviceDisclosure";
import {FALSE, TRUE, UNDEFINED} from "constants/primitives";
import {ITCFDeviceDisclosure as ITCFDeviceDisclosureResponse} from "types/tcf";
import {useCallback, useState} from "preact/hooks";

const useLoadDeviceDisclosure = (): [((url: string, vendorId: number) => Promise<unknown>), (ITCFDeviceDisclosureResponse | undefined), boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(FALSE);
  const [deviceDisclosure, setDeviceDisclosure] =
    useState<ITCFDeviceDisclosureResponse | undefined>(UNDEFINED);

  const loadDeviceDisclosure = useCallback((url: string, vendorId: number) => {
    return new Promise((resolve, reject) => {
      try {
        if (!url) {
          return;
        }

        if (cachedDeviceDisclosures[vendorId]) {
          setDeviceDisclosure(cachedDeviceDisclosures[vendorId]);
          setIsLoading(FALSE);
          return;
        }

        setDeviceDisclosure(UNDEFINED);
        setIsLoading(TRUE);

        fetchTCFDeviceDisclosure(url, vendorId)
          .then((res) => {
            cachedDeviceDisclosures[vendorId] = res;
            setDeviceDisclosure(cachedDeviceDisclosures[vendorId]);
          })
          .catch(err => {
            console.error("Error fetching Device Disclosures:", err);
          })
          .finally(() => {
            setIsLoading(FALSE);
          });
        resolve(deviceDisclosure);
      } catch (error) {
        reject(error);
      }
    })
  }, [deviceDisclosure]);

  return [
    loadDeviceDisclosure,
    deviceDisclosure,
    isLoading,
  ];
}

export default useLoadDeviceDisclosure;