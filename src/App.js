import React, { useEffect } from 'react';
import './styles/main.scss';
import { makeApiParams } from './services/api';
import MyRegion from './containers/MyRegion';
import FavoriteRegion from './containers/FavoriteRegion';
import TotalRegion from './containers/TotalRegion';
import Button from './components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { receiveApiData, receiveApiTotalData } from './actions';

function App () {
  const { pageState, currentMyState, currentTotalState, totalData, bookMark } = useSelector(state => state.dust);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiveApiData()) //current api 초기화
    if(pageState===2) { //즐겨찾기 기능 시 미리 받은 데이터가 없을 수도 있으므로 예외로 별로 처리
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
    } else {
      fetch(makeApiParams([currentMyState, currentTotalState][pageState]['sidoName']))
        .then(response => response.json())
        .then(data => {
          const currentData = data['response']['body']['items'];
          dispatch(receiveApiData(currentData))  // 현재 선택된 시,도 데이터 업데이트
          dispatch(receiveApiTotalData(currentData)) // 전체 데이터 추가
        })
    }
  },[currentMyState, currentTotalState, pageState, dispatch])

  return (
    <div className='flex pos-mc'>
      <div className='w-80per'>
        { /* content 부분 */
          pageState===0 
          ? <MyRegion/> // page가 0일 때 가운데 영역 만들기
          : pageState===1 
            ? <TotalRegion/> // page가 1일 때 가운데 영역 만들기 
            : pageState===2 
              ? <FavoriteRegion/>
              : null 
        }
        {/* 하단 네비게이션 영역 */}
        <Button/>
      </div>
    </div>
  )
}

export default App