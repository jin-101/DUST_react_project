import React from 'react';
import './styles/main.scss';
import MyRegion from './containers/MyRegion';
import FavoriteRegion from './containers/FavoriteRegion';
import TotalRegion from './containers/TotalRegion';
import Button from './components/Button';
import { useSelector } from 'react-redux';

function App () {
  const { pageState } = useSelector(state => state.dust);

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