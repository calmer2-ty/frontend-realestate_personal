import type { IRegionData, IRegionItem } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다
import { getCachedRegionData, setRegionCache } from "./regionCache";
import { regionApi } from "./regionApi";

// 지역 데이터를 가져올 도시 리스트
const cities = [
  "서울특별시",
  "경기도",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "경상북도",
  "경상남도",
  "전라남도",
  "충청북도",
  "충청남도",
  "세종특별자치시",
  "전북특별자치도",
  "제주특별자치도",
  "강원특별자치도",
];

// 특정 도시의 지역 데이터를 가져오는 함수
export const regionData = async (city: string): Promise<IRegionData> => {
  const cacheKey = `region_${city}`;
  const cachedData = getCachedRegionData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`${city}의 지역 데이터 캐시 히트`);
    return cachedData;
  }

  // 캐시에 없는 경우 실제 데이터를 요청합니다
  try {
    const regionData = await regionApi(city);
    setRegionCache(cacheKey, regionData);

    return regionData;
  } catch (error) {
    throw new Error(`${city}의 지역 데이터를 가져오는 데 실패했습니다`); // 에러를 throw하여 호출자에게 전달합니다
  }
};

// 모든 도시의 지역 데이터를 일괄적으로 가져오는 함수
export const regionAllData = async (): Promise<IRegionItem[]> => {
  try {
    const promises = cities.map((city) => regionData(city)); // 각 도시에 대해 데이터를 가져오는 Promise 배열을 생성합니다
    const regionDatas = await Promise.all(promises); // Promise.all을 사용해 모든 데이터를 병렬로 가져옵니다

    const filteredRegionDatas = regionDatas.flatMap((data) =>
      data?.StanReginCd[1]?.row
        ?.filter((el) => el.umd_cd === "000" && el.sgg_cd !== "000")
        .map((el) => ({
          locatadd_nm: el.locatadd_nm,
          region_cd: el.region_cd.slice(0, 5),
        }))
    );
    return filteredRegionDatas; // 모든 도시의 지역 데이터 배열을 반환합니다
  } catch (error) {
    console.error("지역 데이터를 가져오는 중 에러 발생:", error); // 모든 도시의 지역 데이터 가져오기 실패 시 에러를 로깅합니다
    throw error;
  }
};
