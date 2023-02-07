import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TotalRegion from './containers/TotalRegion';
import './main.scss';
import { initialUserInfo, navigatorMenu } from './datas';
import MyRegion from './containers/MyRegion';


const Button = styled.div`
  width: 33%;
  height: 100px;
  margin:10px;
`;

function App () {
  const [apiData, setApiData] = useState();
  const [userSido, setUserSido] = useState(initialUserInfo);
  const [totalSido, setTotalSido] = useState(initialUserInfo.first);
  const [pageState, setPageState] = useState(1);

  const naviAction = (value) => {
    setPageState(value);
  }
  const totalOnChange = (e) => {
    setTotalSido(e)
  }

  useEffect(() => {
    const sido = pageState===1? totalSido : (pageState===0 ? userSido : null)
    const getParameters = {
      serviceKey: 'yPJqaMFS6oMo9IfIkwzoXlArnowxkiCn0mcTI6FXvz%2F8Ho5E%2BE%2B4vYaequ2E8lLPGOAEABqJXiegFBkRp2qrvQ%3D%3D',
      returnType:'json',
      numOfRows:'100',
      pageNo:'1',
      sidoName: sido,
      ver:'1.0',
    }
    fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${getParameters['serviceKey']}&returnType=${getParameters['returnType']}&numOfRows=${getParameters['numOfRows']}&pageNo=${getParameters['pageNo']}&sidoName=${getParameters['sidoName']}&ver=${getParameters['ver']}`)
    .then(response => response.json())
    .then(data => {setApiData(data['response']['body']['items'])})
  
  },[userSido, totalSido])
  console.log(apiData); //sidoName, stationName
  return (
    <div className='flex pos-mc'>
      <div className='w-80per'>
        {pageState===0 ? <MyRegion data={apiData} onChange={() => {}}/> // page가 0일 때 가운데 영역 만들기
          : pageState===1 ? <TotalRegion data={apiData} onChange={totalOnChange}/> // page가 1일 때 가운데 영역 만들기
            : pageState===2 ? <div>즐겨찾기</div> // page가 2일 때 가운데 영역 만들기
              : null }
      {/* 하단 네비게이션 영역 */}
        <div className='flex pos-mc'>
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
