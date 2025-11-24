import { CustomAttributionParametersReq } from "@n3oltd/karakoram.cart.sdk.connect";

import {
  N3O_ATTRIBTION_COOKIE_KEY,
  CART_COOKIE_KEY,
} from "@/api/common/constants/cookie";
import { CapacitorCookies } from "@capacitor/core";

interface AttributionData {
  attribution: {
    [key: string]: Array<{
      option: string;
      percentage: number;
    }>;
  };
}

export function getAttributionCookie():
  | CustomAttributionParametersReq
  | undefined {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${N3O_ATTRIBTION_COOKIE_KEY}=`))
    ?.split("=")[1];

  if (!cookieValue) return {};

  try {
    const parsedData = JSON.parse(
      decodeURIComponent(cookieValue),
    ) as AttributionData;
    return mapAttributionData(parsedData);
  } catch (error) {
    console.error("Error parsing attribution cookie:", error);
  }
}

function mapAttributionData(
  data: AttributionData,
): CustomAttributionParametersReq {
  const mappedData: any = {};

  Object.entries(data.attribution).forEach(([key, value]) => {
    const dimensionKey = `dimension${Number(key.substring(1)) + 1}`;
    mappedData[dimensionKey] = value.map((v) => v.option);
  });

  return mappedData;
}

export async function getCartId(): Promise<string | null> {
  const cookies = await CapacitorCookies.getCookies();
  return cookies[CART_COOKIE_KEY];
}

export async function setCartId(cartId: string): Promise<void> {
  await CapacitorCookies.setCookie({ key: CART_COOKIE_KEY, value: cartId });
}
