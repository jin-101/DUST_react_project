import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { receiveApiTotalData } from "../actions";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { makeApiParams } from "../services/api";

const CardsStyle = styled.div`
  height: 600px;
  overflow : auto;
`;

function FavoriteRegion () { 
  const totalData = useSelector(state => state.dust.totalData);
  const bookMark = useSelector(state => state.dust.bookMark);
  const pageState = useSelector(state => state.dust.pageState);
  const dispatch = useDispatch();

  useEffect(()=>{
    const addTotalEl = [
      ...new Set(
        bookMark.filter(el => !totalData.some(arr => arr.sidoName === el.sidoName))
                .map(el => el.sidoName)
      )
    ];
    addTotalEl.forEach(el => {
      fetch(makeApiParams(el))
        .then(response => response.json())
        .then(data => {
          dispatch(receiveApiTotalData(data['response']['body']['items'])) // 전체 데이터 추가
        })
    });
  },[pageState,dispatch,bookMark,totalData])

  const favoriteArray = totalData.filter(x => bookMark.some(origin => origin.stationName === x.stationName));
  const isLoading = favoriteArray.length !== bookMark.length;
  return (
    <>
      <div className='flex pos-mc mg-small h-50'></div>
      <div>
        { isLoading
          ? <Loading/>
          : <CardsStyle>
              {favoriteArray.map((el,index) => {
                  return <Card 
                    data = {el}
                    key = {index}
                    existFavorite = {true}
                    isFavorite = {true}
                  />
                })
              }
            </CardsStyle>
        }
      </div>
      </>
  )
}

export default FavoriteRegion;