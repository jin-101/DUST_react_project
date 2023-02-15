import { BiMap } from "react-icons/bi";
import { GrMap } from "react-icons/gr";
import { MdStar } from "react-icons/md";

// 사용자 정보
export const initialMyRegionState = {
    sidoName:'경기',
    stationName: '교문동'
}
export const initialTotalRegionState = {
  sidoName:'서울'
}
export const initialMyFavoriteRegion = [
  {sidoName:'대구',stationName:'남산1동'},
  {sidoName:'서울',stationName:'정릉로'},
  {sidoName:'서울',stationName:'동대문구'},
  {sidoName:'경기',stationName:'금곡동'}
]

// 초기상태
export const initialData = {
  pageState: 1,
  currentData : [],
  totalData : [],
  bookMark : [
    ...initialMyFavoriteRegion
  ],
  currentMyState : {
    ...initialMyRegionState
  },
  currentTotalState : {
    ...initialTotalRegionState
  }
}

export const navigatorMenu = [
  {index:0, text:'내 지역보기', icon: <BiMap/>},
  {index:1, text:'전체 시도보기', icon: <GrMap/>},
  {index:2, text:'즐겨찾기', icon: <MdStar/>},
]

export const makeInfomation = (grade) => {
  switch(grade){
    case '1':
      return {
        text : '좋음',
        color: '#6698cb' //blue
      };
    case '2':
      return {
        text : '보통',
        color: '#82c8a0' //green
      };
    case '3':
      return {
        text : '한때 나쁨',
        color: '#f0d264' //yellow
      };
    case '4':
      return {
        text : '나쁨',
        color: 'orange' //orange
      };
    case '5':
      return {
        text : '매우 나쁨',
        color: '#fa5a5a' //red
      };
    default:
      return {
        text : '알수없음',
        color: 'gray'
      }
  }
}

export const regionList = ['서울','부산','대구','인천','광주','대전','울산','경기','강원','충남','충북','전남','전북','경남','경북','제주','세종','전국']
