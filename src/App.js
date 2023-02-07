import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import TotalRegion from './containers/TotalRegion';
import './main.scss';
import { firstPageState, inintialUserFavorite, initialApiData, navigatorMenu, regionList, secondPageState } from './datas';
import MyRegion from './containers/MyRegion';
import Loading from './components/Loading';
import Dropdown from './components/Dropdown';


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
          'second':'',
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
    console.error(bool,data,favoriteArray);
    if(bool) setfavoriteArray([...favoriteArray, data.stationName])
    else setfavoriteArray(favoriteArray.filter(arr => arr !== data.stationName))
  }
  

  useEffect(() => {
    if(pageState===2) return;
    console.warn('useEffect안에 들어옴', apiData, firstP, secondP);
    const current = [firstP,secondP][pageState]['first'];

     //기존 코드
    // if(apiData.data.some(el=>el.sidoName===current)) return
    // else setApiData(initialApiData);

    // if(test.some(el=>el.sidoName===current)) {
    //   const newData = test.filter(el=>el.sidoName===current);
    //   setApiData({data: newData, list: newData.map(el => el.stationName)})
    //   return;
    // }else setApiData(initialApiData);

   

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
      //기존 코드
      // const datas = data['response']['body']['items'];
      // setApiData({data: datas, list: datas.map(el => el.stationName)})

      const datas = [...test, ...data['response']['body']['items']].reverse().filter((arr, index, callback) => index ===callback.findIndex((loc) => loc.stationName === arr.stationName)).reverse();
      setTest(datas);
      if(datas.some(el=>el.sidoName===current)) {
        const newData = datas.filter(el=>el.sidoName===current);
        setApiData({data: newData, list: newData.map(el => el.stationName)})
        console.log('데이터 통합(중복제거)', datas, '현재 데이터', newData);
      }
      // setApiData({data: datas, list: datas.map(el => el.stationName)})
      // console.log('현재 데이터', datas);

      // setTest([...test, ...datas].reverse().filter((arr, index, callback) => index ===callback.findIndex((loc) => loc.stationName === arr.stationName)).reverse())

    })
  },[firstP,secondP,pageState])
  
  // console.log('test 배열 입니다.',test)
  // console.log([{'aa':1,'bb':1},{'aa':2,'bb':1}, {'aa':3,'bb':1}, {'aa':4,'bb':1},{'aa':1,'bb':10},{'aa':3,'bb':10}].reverse().filter((arr, index, callback) => index ===callback.findIndex((loc) => loc.aa === arr.aa)).reverse());
  return (
    <div className='flex pos-mc'>
      <div className='w-80per'>
        <div className='flex pos-mc mg-small h-50'> 
          { //상단 부분
            <>
            {
            (apiData.data.length > 0 && pageState!==2) ?  //page가 0,1일 때 dropdown
              Object.entries([firstP,secondP][pageState]).map((els,index) => {
                const lists = index===0 ? regionList : apiData.list
                return <Dropdown key={index} name={els[0]} val={els[1]} list={lists} onChange={dropChange}/>
              }) : null
            }
            </>
          }
        </div>
        <div>
          { //content 부분
          apiData.data.length === 0 ? <Loading/>
            :pageState===0 ? <MyRegion 
                                data={apiData.data} 
                                val = {[firstP,secondP][pageState]['second']}
                              /> // page가 0일 때 가운데 영역 만들기
              : pageState===1 ? <TotalRegion 
                                  data={apiData.data} 
                                  favoriteData={favoriteArray} 
                                  onClick={favoriteOnClick} 
                                /> // page가 1일 때 가운데 영역 만들기   onClick={favoriteOnClick}
                : pageState===2 ? <TotalRegion 
                                    data={test} 
                                    favoriteData={favoriteArray} 
                                    onClick={favoriteOnClick}
                                    isAll={true} 
                                  /> // page가 2일 때 가운데 영역 만들기   data = {favoriteArray} onClick={favoriteOnClick}
                  : null 
          }
        </div>
        {  console.log('즐겨찾기',favoriteArray, apiData)}
        {/* {apiData.data.filter(x => favoriteArray.includes(x.stationName))} */}
        {/* {console.log(apiData.data.filter(x => favoriteArray.includes(x.stationName)))} */}
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
