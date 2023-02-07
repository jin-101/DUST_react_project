import React, { useEffect, useState } from 'react';
import { MdStar } from 'react-icons/md';
import { BiMap } from 'react-icons/bi';
import { GrMap } from 'react-icons/gr';
import styled from 'styled-components';
import Dropdown from './components/Dropdown';
import Loading from './components/Loading';
import TotalRegion from './containers/TotalRegion';
import './main.scss';

// 사용자 정보
const initialUserInfo = {
  first:'서울',
  second: '종로구'
}

const Button = styled.div`
  width: 33%;
  height: 100px;
  margin:10px;
`;

const navigatorMenu = [
  {index:0, text:'내 지역보기', icon: <BiMap/>},
  {index:1, text:'전체 시도보기', icon: <GrMap/>},
  {index:2, text:'즐겨찾기', icon: <MdStar/>},
]


function App () {
  const [apiData, setApiData] = useState();
  const [userSido, setUserSido] = useState(initialUserInfo);
  const [totalSido, setTotalSido] = useState(initialUserInfo.first);
  const [pageState, setPageState] = useState(1);

  const naviAction = (value) => {
    setPageState(value);
  }

  useEffect(() => {
    const getParameters = {
      serviceKey: 'yPJqaMFS6oMo9IfIkwzoXlArnowxkiCn0mcTI6FXvz%2F8Ho5E%2BE%2B4vYaequ2E8lLPGOAEABqJXiegFBkRp2qrvQ%3D%3D',
      returnType:'json',
      numOfRows:'100',
      pageNo:'1',
      sidoName: pageState===1? totalSido : (pageState===0 ? userSido : null),
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
          <div className='flex pos-mc mg-small'>
            <Dropdown onChange={(e)=>{setTotalSido(e)}}/>
          </div>
          {!apiData 
            ? <Loading/>
            : (
              pageState===0  // page가 0일 때 가운데 영역 만들기
              ? <div>0번 토글</div>
              : pageState===1 // page가 1일 때 가운데 영역 만들기
                ? <TotalRegion data={apiData}/>
                : pageState===2 // page가 2일 때 가운데 영역 만들기
                  ? <div>즐겨찾기</div>
                  : null
              )
        }
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
