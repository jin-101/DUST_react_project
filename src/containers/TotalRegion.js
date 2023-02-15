import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { receiveApiData, receiveApiTotalData } from "../actions";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Loading from "../components/Loading";
import { makeApiParams } from "../services/api";
import { regionList } from "../utils";

const CardsStyle = styled.div`
  height: 600px;
  overflow : auto;
`;

function TotalRegion ({onChange}) {  
  const currentTotalState = useSelector(state => state.dust.currentTotalState);
  const currentData = useSelector(state => state.dust.currentData);
  const bookMark = useSelector(state => state.dust.bookMark);
  const dispatch = useDispatch();
 useEffect(() => {
    dispatch(receiveApiData()) //current api 초기화
      fetch(makeApiParams(currentTotalState['sidoName']))
        .then(response => response.json())
        .then(data => {
          const currentData = data['response']['body']['items'];
          dispatch(receiveApiData(currentData))  // 현재 선택된 시,도 데이터 업데이트
          dispatch(receiveApiTotalData(currentData)) // 전체 데이터 추가
        })
  },[currentTotalState, dispatch])

  return (
    <>
      <div className='flex pos-mc mg-small h-50'>
        {Object.entries(currentTotalState).map((els, index) => {
          return <Dropdown key={index} name={els[0]} val={els[1]} list={regionList} onChange={onChange}/>
        })}     
      </div>
      <div>
        <CardsStyle>
          { currentData.length===0 
              ? <Loading/>
              : currentData.map((el,index) => {
                  const bool = bookMark.some(origin => origin.stationName === el.stationName);
                  return (
                    <Card 
                      data = {el}
                      key = {index}
                      existFavorite = {true}
                      isFavorite = {bool}
                    />
                  )
                })
          }
        </CardsStyle>
      </div>
    </>
  )
}

export default TotalRegion;