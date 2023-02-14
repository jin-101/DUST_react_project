import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import './main.scss';
import { initialMyRegionState, initialTotalRegionState, navigatorMenu } from './datas';
import MyRegion from './containers/MyRegion';
import FavoriteRegion from './containers/FavoriteRegion';
import TotalRegion from './containers/TotalRegion';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, receiveCurrentData, receiveTotalData, removeFavorite } from './reducers/favorite';


const Button = styled.div`
  width: 33%;
  height: 100px;
  margin:10px;
`;

const makeApiParams = sido => {
  return {
    serviceKey: 'yPJqaMFS6oMo9IfIkwzoXlArnowxkiCn0mcTI6FXvz%2F8Ho5E%2BE%2B4vYaequ2E8lLPGOAEABqJXiegFBkRp2qrvQ%3D%3D',
    returnType:'json',
    numOfRows:'100',
    pageNo:'1',
    sidoName: sido,
    ver:'1.0',
  }
}

function App () {
  const [pageState, setPageState] = useState(2);
  const [myState, setMyState] = useState(initialMyRegionState);
  const [totalState, setTotalState] = useState(initialTotalRegionState);
  const favorite = useSelector(state => state.favorite)// 추후 삭제 가능
  const { total ,bookMark } = favorite;
  const dispatch = useDispatch();


  function naviAction(page) {
    setPageState(page);
    console.warn('화면을 전환했어요', favorite);
    switch (page){
      case 0:
        return setMyState({
          ...initialMyRegionState
        });
      case 1:
        return setTotalState({
          ...initialTotalRegionState
        });
      default:
        return null;
    }
  }
  
  const dropChange = useCallback((e) => {
    const {name, value} = e.target;
    console.warn('드롭버튼을 눌렀어요');
    switch (pageState) {
      case 0:
        setMyState({
          ...myState,
          'stationName':'',
          [name]: value
        })
        return;
      case 1:
        setTotalState({
          ...totalState,
          [name]: value
        })
        return;
      default:
        return null;
    }
  },[pageState,myState,totalState])
  
  const favoriteOnClick = (bool, data) => {
    if(bool) dispatch(addFavorite(data))
    else dispatch(removeFavorite(data))
  }
  


  useEffect(() => {
    console.warn('useEffect안에 들어옴', {myState, totalState, favorite});
    dispatch(receiveCurrentData()) //current api 초기화
    if(pageState===2) { //즐겨찾기 기능 시 미리 받은 데이터가 없을 수도 있으므로 예외로 별로 처리
      const addTotalEl = [...new Set(bookMark.filter(el => !total.some(arr => arr.sidoName === el.sidoName)).map(el => el.sidoName))];
        addTotalEl.forEach(el => {
          console.log(el);
          const {serviceKey,returnType,numOfRows,pageNo,sidoName,ver} = makeApiParams(el);
          fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&sidoName=${sidoName}&ver=${ver}`)
            .then(response => response.json())
            .then(data => {
              dispatch(receiveTotalData(data['response']['body']['items'])) // 전체 데이터 추가
            })
        });  
    } else {
    const {serviceKey,returnType,numOfRows,pageNo,sidoName,ver} = makeApiParams([myState, totalState][pageState]['sidoName']);
    fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&sidoName=${sidoName}&ver=${ver}`)
      .then(response => response.json())
      .then(data => {
        const currentData = data['response']['body']['items'];
        dispatch(receiveCurrentData(currentData))  // 현재 선택된 시,도 데이터 업데이트
        dispatch(receiveTotalData(currentData)) // 전체 데이터 추가
        console.log('api 수신완료 : ',favorite);
      })
    }
  },[myState,totalState,pageState])
  
  return (
    <div className='flex pos-mc'>
      <div className='w-80per'>
        {/* content 부분 */}
        {
          pageState===0 
          ? <MyRegion 
              value = {myState} //내 지역 myState
              onChange = {dropChange}
            /> // page가 0일 때 가운데 영역 만들기
          : pageState===1 
            ? <TotalRegion 
                value = {totalState} //전체 지역 myState 
                onChange = {dropChange}
                onClick={favoriteOnClick} // 즐겨찾기 클릭시 호출함수
              /> // page가 1일 때 가운데 영역 만들기   onClick={favoriteOnClick}
            : pageState===2 
              ? <FavoriteRegion 
                  onClick={favoriteOnClick} // 즐겨찾기 클릭시 호출함수
                />
              : null 
        }
        {/* 하단 네비게이션 영역 */}
        <div className='flex pos-mc h-100'>
          {navigatorMenu.map(item => {
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