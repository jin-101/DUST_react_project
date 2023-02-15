import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import './main.scss';
import { navigatorMenu } from './datas';
import { makeApiParams } from './api/api';
import MyRegion from './containers/MyRegion';
import FavoriteRegion from './containers/FavoriteRegion';
import TotalRegion from './containers/TotalRegion';
import { useDispatch, useSelector } from 'react-redux';
import { currentMyRegion, currentTotalRegion, receiveCurrentData, receiveTotalData } from './actions';

const Button = styled.div`
  width: 33%;
  height: 100px;
  margin:10px;
`;

function App () {
  const [ pageState, setPageState ] = useState(0);
  const favorite = useSelector(state => state.favorite)// 추후 삭제 가능
  const { currentMyState, currentTotalState, totalData, bookMark } = favorite;
  const dispatch = useDispatch();

  const naviAction = useCallback((page) => {
    setPageState(page);
    console.log('화면을 전환했어요');
    switch (page){
      case 0:
        return dispatch(currentMyRegion())
      case 1:
        return dispatch(currentTotalRegion())
      default:
        return null;
    }
  },[dispatch])
  
  const dropChange = useCallback((e) => {
    const {name, value} = e.target;
    console.log('드롭버튼을 눌렀어요');
    switch (pageState) {
      case 0:
        dispatch(currentMyRegion({[name]:value}))
        return;
      case 1:
        dispatch(currentTotalRegion({[name]:value}))
        return;
      default:
        return null;
    }
  },[pageState, dispatch])


  useEffect(() => {
    console.log('useEffect안에 들어옴');
    dispatch(receiveCurrentData()) //current api 초기화
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
            dispatch(receiveTotalData(data['response']['body']['items'])) // 전체 데이터 추가
          })
      });  
    } else {
      fetch(makeApiParams([currentMyState, currentTotalState][pageState]['sidoName']))
        .then(response => response.json())
        .then(data => {
          const currentData = data['response']['body']['items'];
          dispatch(receiveCurrentData(currentData))  // 현재 선택된 시,도 데이터 업데이트
          dispatch(receiveTotalData(currentData)) // 전체 데이터 추가
          console.log('api 수신완료');
        })
    }
  },[currentMyState, currentTotalState, pageState, dispatch])

  
  return (
    <div className='flex pos-mc'>
      <div className='w-80per'>
        { /* content 부분 */
          pageState===0 
          ? <MyRegion onChange = {dropChange}/> // page가 0일 때 가운데 영역 만들기
          : pageState===1 
            ? <TotalRegion onChange = {dropChange}/> // page가 1일 때 가운데 영역 만들기   onClick={favoriteOnClick}
            : pageState===2 
              ? <FavoriteRegion/>
              : null 
        }
        {/* 하단 네비게이션 영역 */}
        <div className='flex pos-mc h-100'>
          {navigatorMenu.map(item => {
            console.log('aaa');
            return (
              <Button key={item.index} onClick={()=>{naviAction(item.index)}}>
                <div className='flex pos-mc mg-medium fs-medium'>{item.icon}</div>
                <div className='flex pos-mc mg-small'>{item.text}</div>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App