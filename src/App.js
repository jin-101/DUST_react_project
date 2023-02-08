import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import './main.scss';
import { firstPageState, inintialUserFavorite, initialApiData, navigatorMenu, regionList, secondPageState } from './datas';
import MyRegion from './containers/MyRegion';
import FavoriteRegion from './containers/FavoriteRegion';
import TotalRegion from './containers/TotalRegion';


const Button = styled.div`
  width: 33%;
  height: 100px;
  margin:10px;
`;

function App () {
  const [apiData, setApiData] = useState(initialApiData);
  const [firstP, setFirstP] = useState(firstPageState);
  const [secondP, setSecondP] = useState(secondPageState);
  const [pageState, setPageState] = useState(1);
  const [favoriteArray, setfavoriteArray] = useState(inintialUserFavorite);

  const [test, setTest] = useState([]);

  const naviAction = useCallback((page) => {
    setPageState(page);
    console.warn('화면을 전환했어요', favoriteArray);
    switch (page){
      case 0:
        return setFirstP({
          ...firstPageState
        });
      case 1:
        return setSecondP({
          ...secondPageState
        });
      default:
        return null;
    }
  },[])
  
  const dropChange = useCallback((e) => {
    const {name, value} = e.target;
    console.warn('드롭버튼을 눌렀어요');
    switch (pageState) {
      case 0:
        setFirstP({
          ...firstP,
          'stationName':'',
          [name]: value
        })
        return;
      case 1:
        setSecondP({
          ...secondP,
          [name]: value
        })
        return;
      default:
        return null;
    }
  },[pageState,firstP,secondP])
  
  const favoriteOnClick = (bool, data) => {
    const currentData = {
      sidoName: data.sidoName,
      stationName: data.stationName
    }
    console.log('즐겨찾기를 눌렀어요.', bool,favoriteArray,currentData);
    if(bool) {
      return setfavoriteArray([
        ...favoriteArray, 
        currentData
      ])
    } else {
      return setfavoriteArray(
        favoriteArray.filter(arr => arr.stationName !== currentData.stationName)
      )
    }
  }
  

  useEffect(() => {
    if(pageState===2) return;
    console.warn('useEffect안에 들어옴', apiData, firstP, secondP);
    const current = [firstP,secondP][pageState]['sidoName'];

    if(!apiData.data.some(el=>el.sidoName===current)) setApiData(initialApiData);
    
    const getParameters = {
      serviceKey: 'yPJqaMFS6oMo9IfIkwzoXlArnowxkiCn0mcTI6FXvz%2F8Ho5E%2BE%2B4vYaequ2E8lLPGOAEABqJXiegFBkRp2qrvQ%3D%3D',
      returnType:'json',
      numOfRows:'100',
      pageNo:'1',
      sidoName: current,
      ver:'1.0',
    }
    fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${getParameters['serviceKey']}&returnType=${getParameters['returnType']}&numOfRows=${getParameters['numOfRows']}&pageNo=${getParameters['pageNo']}&sidoName=${getParameters['sidoName']}&ver=${getParameters['ver']}`)
    .then(response => response.json())
    .then(data => {
      const datas = [...test, ...data['response']['body']['items']].reverse().filter((arr, index, callback) => index ===callback.findIndex((loc) => loc.stationName === arr.stationName)).reverse();
      setTest(datas);
      if(datas.some(el=>el.sidoName===current)) {
        const newData = datas.filter(el=>el.sidoName===current);
        setApiData({data: newData, list: newData.map(el => el.stationName)})
        console.log('데이터 통합(중복제거)', datas, '현재 데이터', newData);
      }
    })
  },[firstP,secondP,pageState])
  
  return (
    <div className='flex pos-mc'>
      <div className='w-80per'>
        {/* content 부분 */}
        {
          pageState===0 
          ? <MyRegion 
              dataSet={apiData} // 그릴 데이터
              // list = {apiData.list}
              value = {firstP} //내 지역 firstP
              onChange = {dropChange}
            /> // page가 0일 때 가운데 영역 만들기
          : pageState===1 
            ? <TotalRegion 
                dataSet={apiData}
                value = {secondP} //내 지역 firstP // 그릴 데이터
                onChange = {dropChange}
                favoriteData={favoriteArray}  // 즐겨찾기 등록 지역
                onClick={favoriteOnClick} // 즐겨찾기 클릭시 호출함수
              /> // page가 1일 때 가운데 영역 만들기   onClick={favoriteOnClick}
            : pageState===2 
              ? <FavoriteRegion 
                  data={test} // 그릴 데이터
                  favoriteData={favoriteArray}  // 즐겨찾기 등록 지역
                  onClick={favoriteOnClick} // 즐겨찾기 클릭시 호출함수
                /> // page가 2일 때 가운데 영역 만들기   data = {favoriteArray} onClick={favoriteOnClick}
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