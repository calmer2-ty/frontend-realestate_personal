import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils";
import ChipSmall from "@/src/components/commons/dataDisplays/chip/small";

import type { IMapsInfoProps } from "./types";
import type { IFirebaseData } from "@/src/types";
import * as S from "./styles";
import Link from "next/link";

export default function MapsInfo(props: IMapsInfoProps): JSX.Element {
  const matchedFirebaseData: IFirebaseData[] = props.firebaseDatas.filter(
    (el) => shortenCityName(props.selectedMarkerData?.address ?? "") === el.address || shortenCityName(props.selectedMarkerData?.address_street ?? "") === el.address
  );
  console.log("matchedFirebaseData:::", matchedFirebaseData);
  return (
    <S.Container>
      {/* 클릭 된 건물 상세 정보 */}
      {props.selectedMarkerData !== null ? (
        <S.SelectedArea>
          <S.SelectedInfo>
            <S.InfoWrap>
              <S.SelectedBuildingName>{props.selectedMarkerData.buildingName}</S.SelectedBuildingName>
              연식: {props.selectedMarkerData.constructionYear}
              <br />
              <S.TextWrap>
                <ChipSmall label="지번" /> {props.selectedMarkerData.address}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="도로명" />
                {props.selectedMarkerData.address_street}
              </S.TextWrap>
            </S.InfoWrap>

            <S.InfoWrap>
              <S.SelectedTitle>최근 실거래가</S.SelectedTitle>
              <S.SelectedContent>
                <p>
                  <strong>
                    매매 {isBillion(props.selectedMarkerData.price)}&nbsp;
                    {isTenMillion(props.selectedMarkerData.price)}원
                  </strong>
                  <br />
                  {props.selectedMarkerData.dealYear}.{props.selectedMarkerData.dealMonth}.{props.selectedMarkerData.dealDay}・{props.selectedMarkerData.floor}층・{props.selectedMarkerData.area}m²
                </p>
              </S.SelectedContent>
            </S.InfoWrap>
          </S.SelectedInfo>

          {/* 등록된 건물 정보 */}
          <S.RegisteredInfo>
            {matchedFirebaseData.length > 0 ? (
              <ul>
                {matchedFirebaseData.map((el, index) => (
                  <S.RegisteredItem key={`${el.type}_${el.address}_${index}`}>
                    <Link href={`/buildings/${el._id}`}>
                      <strong>
                        매매 {isBillion(el.price)}&nbsp;
                        {isTenMillion(el.price)}원
                      </strong>
                      <br />
                      {el.type}・{el.addressDetail}
                      <br />
                      {el.floor}층, {el.area}m², 관리비 {el.manageCost}만원
                    </Link>
                  </S.RegisteredItem>
                ))}
              </ul>
            ) : (
              <div>매물 없음</div>
            )}
          </S.RegisteredInfo>
        </S.SelectedArea>
      ) : (
        <>
          {/* 보여지는 지도 범위의 건물 리스트 */}
          <S.VisibleArea>
            <ul>
              {props.visibleMarkerDatas.map((el, index) => {
                const matchingFirebaseData = props.firebaseDatas.some((firebaseData) => shortenCityName(el.address) === firebaseData.address);

                return (
                  <S.VisibleList key={`${el.address}_${index}`}>
                    <S.VisibleTitle>
                      매매 {isBillion(el.price)}&nbsp;
                      {isTenMillion(el.price)}원
                    </S.VisibleTitle>
                    <p>
                      아파트・{el.buildingName}
                      <br />
                      {el.area}m² {el.floor}층
                    </p>
                    <div>{matchingFirebaseData && <>매물있음</>}</div>
                  </S.VisibleList>
                );
              })}
            </ul>
          </S.VisibleArea>
        </>
      )}
    </S.Container>
  );
}
