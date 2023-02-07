import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TotalRegion from './containers/TotalRegion';
import './main.scss';
import { firstPageState, initialApiData, navigatorMenu, regionList, secondPageState } from './datas';
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
  const [isLoading, setIsLoading] = useState(true);


  const naviAction = (page) => {
    setPageState(page);
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
  }
  
  const secondChange = (e) => {
    const {name, value} = e.target;
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
  }

  useEffect(() => {
    setIsLoading(true);
    if(pageState===2) return setIsLoading(false);
    setApiData(initialApiData);
    const getParameters = {
      serviceKey: 'yPJqaMFS6oMo9IfIkwzoXlArnowxkiCn0mcTI6FXvz%2F8Ho5E%2BE%2B4vYaequ2E8lLPGOAEABqJXiegFBkRp2qrvQ%3D%3D',
      returnType:'json',
      numOfRows:'100',
      pageNo:'1',
      sidoName: [firstP,secondP][pageState]['first'],
      ver:'1.0',
    }
    fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${getParameters['serviceKey']}&returnType=${getParameters['returnType']}&numOfRows=${getParameters['numOfRows']}&pageNo=${getParameters['pageNo']}&sidoName=${getParameters['sidoName']}&ver=${getParameters['ver']}`)
    .then(response => response.json())
    .then(data => {
      const datas = data['response']['body']['items'];
      setApiData({data: datas, list: datas.map(el => el.stationName)})
      setIsLoading(false);
     
    })
  },[firstP,secondP,pageState])
  return (
    <div className='flex pos-mc'>
      <div className='w-80per'>
        <div className='flex pos-mc mg-small h-50'>
          {
            pageState!==2 ?
            <>
            {
            (apiData) ? 
              Object.entries([firstP,secondP][pageState]).map((els,index) => {
                const lists = index===0 ? regionList : apiData.list //['선택해주세요.', ...apiData.list]
                return <Dropdown key={index} name={els[0]} val={els[1]} list={lists} onChange={secondChange}/>
              }) : null
            }
            </>
            : null
          }
        </div>
        <div>
          {
          isLoading ? <Loading/>
            :pageState===0 ? <MyRegion data={apiData.data} val = {[firstP,secondP][pageState]['second']}/> // page가 0일 때 가운데 영역 만들기
              : pageState===1 ? <TotalRegion data={apiData.data}/> // page가 1일 때 가운데 영역 만들기
                : pageState===2 ? <div>즐겨찾기</div> // page가 2일 때 가운데 영역 만들기
                  : null 
          }
        </div>
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
