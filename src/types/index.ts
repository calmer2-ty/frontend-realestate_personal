import type { Dispatch, SetStateAction } from "react";

// 지역코드
export interface IRegionData {
  StanReginCd: Array<{
    row: IRegionItem[];
    head: Array<{
      totalCount: number;
    }>;
  }>;
}
export interface IRegionItem {
  locatadd_nm: string;
  region_cd: string;
  umd_cd?: string;
  sgg_cd?: string;
}
// 아파트
export interface IApartmentLocationData {
  locatadd_nm: string;
  apartmentData: IApartmentData;
}
export interface IApartmentData {
  response: {
    body: {
      items: {
        item: IApartmentItem[]; // Item 배열 형태로 정의
      };
    };
  };
}
export interface IApartmentItem {
  지번: string;
  법정동: string;
  법정동본번코드: string;
  법정동부번코드: string;
  도로명: string;
  도로명건물본번호코드: string;
  도로명건물부번호코드: string;
  아파트: string;

  거래금액: string;
  전용면적: number;
  층: number;
  년: string;
  월: string;
  일: string;
  건축년도: number;
}

// Geocode
export interface IGeocodeCoord {
  addresses: Array<{
    x: string; // 경도
    y: string; // 위도
  }>;
}

export interface IGeocodeData {
  latitude: number;
  longitude: number;

  address: string;
  address_street: string;
  apartmentName: string;
  amount: number;
  area: number;
  floor: number;
  dealYear: string;
  dealMonth: string;
  dealDay: string;
  constructionYear: number;
}

// marker
export interface IMarkerData {
  address: string;
  address_street: string;
  apartmentName: string;
  amount: number;
  area: number;
  floor: number;
  dealYear: string;
  dealMonth: string;
  dealDay: string;
  constructionYear: number;
}

export interface IFirebaseData {
  address: string;
  addressDetail: string;
  floor: number;
  area: number;
  price: number;
  roomCount: number;
}

// Hooks Type
export interface IUseNaverMapProps {
  geocodeResults: IGeocodeData[];
  ncpClientId: string | undefined;
  setSelectedMarkerData: Dispatch<SetStateAction<IMarkerData | null>>;
  setVisibleMarkerDatas: Dispatch<SetStateAction<IMarkerData[]>>;

  firebaseDatas: IFirebaseData[];
}
export interface IUseFetchFireBaseProps {
  setFirebaseDatas: Dispatch<SetStateAction<IFirebaseData[]>>;
}
