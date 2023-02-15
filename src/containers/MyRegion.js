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
  height: 550px;
  overflow : auto;
`;

function MyRegion ({onChange}) {
  const currentMyState = useSelector(state => state.dust.currentMyState);
  const currentData = useSelector(state => state.dust.currentData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiveApiData()) //current api 초기화
      fetch(makeApiParams(currentMyState['sidoName']))
        .then(response => response.json())
        .then(data => {
          const currentData = data['response']['body']['items'];
          dispatch(receiveApiData(currentData))  // 현재 선택된 시,도 데이터 업데이트
          dispatch(receiveApiTotalData(currentData)) // 전체 데이터 추가
        })
  },[currentMyState, dispatch])

  const myRegion = currentData.filter((el) => el.stationName === currentMyState.stationName)[0] || currentData[0];
  if(!currentData.length === 0) return <Loading/>
  return (
    <> 
      <div className='flex pos-mc mg-small h-50'> 
      {Object.entries(currentMyState).map((els, index) => {
          const lists = index===0 ? regionList : currentData.map(el => el.stationName)
          return <Dropdown key={index} name={els[0]} val={els[1]} list={lists} onChange={onChange}/>
      })}
      </div>
      <div>
        {
          !myRegion 
            ? <Loading/>
            : <CardsStyle>
                <Card data = {myRegion}/>
              </CardsStyle>
        }
      </div>
    </>

  )
}

export default MyRegion;