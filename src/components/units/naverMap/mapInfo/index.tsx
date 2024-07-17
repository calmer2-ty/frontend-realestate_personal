import { useEffect, useState } from "react";
// Firebase
import { db } from "@/pages/api/firebase";
import { collection, getDocs } from "firebase/firestore";

import { isBillion, isTenMillion } from "@/src/commons/libraries/utils";
import type { IFirebaseData, IMapInfoProps } from "./types";
import { infoStyle } from "./styles";

export default function MapInfo(props: IMapInfoProps): JSX.Element {
  const [firebaseDatas, setFirebaseDatas] = useState<IFirebaseData[]>([]);

  // 특정 패턴을 제거하는 함수
  const removeSpecialCity = (address: string): string => {
    return address
      .replace(/서울특별시/, "서울")
      .replace(/부산광역시/, "부산")
      .replace(/대구광역시/, "대구")
      .replace(/인천광역시/, "인천")
      .replace(/광주광역시/, "광주")
      .replace(/대전광역시/, "대전")
      .replace(/울산광역시/, "울산")
      .replace(/경기도/, "경기")
      .replace(/충청북도/, "충북")
      .replace(/충청남도/, "충남")
      .replace(/전라남도/, "전남")
      .replace(/경상북도/, "경북")
      .replace(/경상남도/, "경남");
    // .replace(/강원특별자치도 /, "강원")
    // .replace(/세종특별자치시/, "세종")
    // .replace(/제주특별자치도/, "제주")
    // .replace(/전북특별자치도/, "전북")
  };

  useEffect(() => {
    const fetchBuildings = async (): Promise<void> => {
      try {
        // const collectionName = getFirestoreCollectionName(selectedOption);
        const querySnapshot = await getDocs(collection(db, "apartment")); // 'building' 컬렉션을 참조합니다
        const datas = querySnapshot.docs.map((el) => {
          const data = el.data();
          // 속성 순서를 일정하게 유지하여 새로운 객체 생성
          return {
            address: data.address,
            addressDetail: data.addressDetail,
          };
        });
        setFirebaseDatas(datas); // 데이터 상태 업데이트
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };
    void fetchBuildings();
  }, []);

  // 비교 및 로그 출력
  // const comparisonResults = props.markerDatas.map((el, index) => {
  //   const markerAddress = removeSpecialCity(el.address);
  //   const matchingFirebaseData = firebaseDatas.find((fbData) => fbData.address === markerAddress);

  //   // 비교 결과를 콘솔에 출력
  //   if (matchingFirebaseData !== undefined) {
  //     console.log(`매칭된 데이터: markerData address: ${el.address}, firebaseData address: ${matchingFirebaseData.address}`);
  //   } else {
  //     console.log(`매칭되지 않은 데이터: markerData address: ${el.address}`);
  //   }

  //   // 반환할 JSX
  //   return <div key={index}>{matchingFirebaseData !== undefined ? <div>매물이 있음</div> : <div>매물이 없습니다</div>}</div>;
  // });

  const matchingFirebaseData = firebaseDatas.find((fbData) => fbData.address === removeSpecialCity(props.selectedMarkerData?.address ?? ""));

  console.log(matchingFirebaseData);
  if (matchingFirebaseData !== undefined) {
    console.log(`매칭된 데이터: selectedMarkerData address: ${props.selectedMarkerData?.address}, firebaseData address: ${matchingFirebaseData.address}`);
  } else {
    console.log(`매칭되지 않은 데이터: markerData address: ${props.selectedMarkerData?.address}`);
  }

  return (
    <div style={infoStyle.container}>
      {props.selectedMarkerData !== null ? (
        <article style={infoStyle.selector.wrap}>
          <section style={infoStyle.selector.container}>
            <h2 style={infoStyle.selector.apartmentName}>{props.selectedMarkerData.apartmentName}</h2>
            <h3 style={infoStyle.selector.recentDeal.title}>최근 실거래가</h3>
            <div style={infoStyle.selector.recentDeal.content}>
              <p>
                <strong>
                  매매 {isBillion(props.selectedMarkerData.amount) !== 0 ? `${isBillion(props.selectedMarkerData.amount)}억` : ""} {isTenMillion(props.selectedMarkerData.amount) !== 0 ? `${isTenMillion(props.selectedMarkerData.amount)}만` : ""} 원
                </strong>
                <br />
                {props.selectedMarkerData.dealYear}.{props.selectedMarkerData.dealMonth}.{props.selectedMarkerData.dealDay}・{props.selectedMarkerData.floor}층・{props.selectedMarkerData.area}m²
                <br />
                {props.selectedMarkerData.address}
              </p>
            </div>
          </section>
          <section>
            {matchingFirebaseData !== undefined ? (
              matchingFirebaseData?.address
            ) : (
              <div>
                조건에 맞는 방이 없습니다.
                <br />
                위치 및 필터를 조정해보세요.
              </div>
            )}
          </section>
        </article>
      ) : (
        <>
          <ul>
            {props.markerDatas.map((el, index) => (
              <li key={`${el.address}_${index}`} style={infoStyle.list.item.container}>
                <h2 style={infoStyle.list.item.amount}>
                  매매 {isBillion(el.amount) !== 0 ? `${isBillion(el.amount)}억` : ""} {isTenMillion(el.amount) !== 0 ? `${isTenMillion(el.amount)}만` : ""} 원
                </h2>
                <p>
                  아파트・{el.apartmentName}
                  <br />
                  {el.area}m² {el.floor}층
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
