import { geocodeApi } from "./geocodeApi";
import type { IGeocodeData } from "@/src/types";

export const selectGeocodeData = async (address: string): Promise<IGeocodeData | null> => {
  console.log("selectGeocodeData props:::", address);
  try {
    const geocodeResult = await geocodeApi(address);
    if (geocodeResult !== null) {
      const result = geocodeResult;

      return result;
    } else {
      console.log(`주소 ${address}에 대한 지오코딩 결과 없음`);
      return null;
    }
  } catch (error) {
    console.error(`Error geocoding address ${address}:`, error);
    return null;
  }
};
