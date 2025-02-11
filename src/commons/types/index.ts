import type { Dispatch, SetStateAction } from "react";
import type { Address } from "react-daum-postcode";

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
export interface IApartmentLocationData {
  datas: IApartmentData;
  locatadd_nm: string;
}

// Geocode
export interface IGeocodeCoord {
  addresses: Array<{
    x: string; // 경도
    y: string; // 위도
    // roadAddress: string;
    // jibunAddress: string;
  }>;
}

export interface IGeocodeData {
  latitude: number;
  longitude: number;
  // roadAddress: string;
  // jibunAddress: string;
}
export interface IGeocodeEtcData {
  latitude: number;
  longitude: number;
  // roadAddress: string;
  // jibunAddress: string;

  address: string;
  address_road: string;
  buildingName: string;
  price: number;
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
  address_road: string;
  buildingName: string;
  price: number;
  area: number;
  floor: number;
  dealYear: string;
  dealMonth: string;
  dealDay: string;
  constructionYear: number;
}

// firebase
export interface IFirebaseData {
  _id: string;
  type: string;
  address: string;
  addressDetail: string;
  floor: number;
  area: number;
  price: number;
  roomCount: number;
  manageCost: number;
  imageUrls?: string[];
  desc: string;
}

// Hooks Type
// address
export interface IUseAddressSearchProps {
  selectedAddress: string;
  geocodeData: IGeocodeData | null;
  onCompleteAddressSearch: (data: Address) => Promise<void>;
}

// maps
export interface IUseAllMarkerProps {
  geocodeResults: IGeocodeEtcData[];
  setSelectedMarkerData: Dispatch<SetStateAction<IMarkerData | null>>;
  setVisibleMarkerDatas: Dispatch<SetStateAction<IMarkerData[]>>;
  firebaseDatas: IFirebaseData[];
}
export interface IUseFetchAllGeocodeDataProps {
  geocodeResults: IGeocodeEtcData[];
  loading: boolean;
  error: Error | null;
  // fetchData: () => Promise<void>;
}

// firebase
export interface IUseFirebaseProps {
  createFirebaseData: (data: IFirebaseData, selectedTypeEng: string) => Promise<void>;
  readFirebaseData: (data: IFirebaseData) => Promise<void>;
  readFirebaseDatas: (buildingType: string) => Promise<IFirebaseData[]>;
}

export interface IUseFirebaseStorageProps {
  uploadFiles: (files: File[]) => Promise<string[]>;
  uploading: boolean;
}

// params
export interface IBuildingParams {
  buildingType: string;
}
export interface IBuildingListParams {
  buildingType: string;
  listId: string;
}
