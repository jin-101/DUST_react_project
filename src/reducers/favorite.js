import { ADD_TO_FAVORITE, RECIEVE_API_DATA, RECIEVE_API_TOTAL_DATA, REMOVE_TO_FAVORITE } from '../actions';
// 리듀서를 불러온다.

// 초기상태
const initialData = {
  currentData : [],
  total : [],
  bookMark : [
    {sidoName:'경북',stationName:'진량읍'},
    {sidoName:'서울',stationName:'정릉로'},
    {sidoName:'서울',stationName:'한강대로'},
    {sidoName:'경기',stationName:'진접읍'}
  ]
}

export const receiveCurrentData = (data=[]) => ({type: RECIEVE_API_DATA, data})
export const receiveTotalData = data => ({type: RECIEVE_API_TOTAL_DATA, data})
export const addFavorite = data => ({type: ADD_TO_FAVORITE, data})
export const removeFavorite = data => ({type: REMOVE_TO_FAVORITE, data}) 


//리듀서
export default function favorite (state = initialData, action) {
  switch (action.type){
    case RECIEVE_API_DATA:
      return {
        ...state,
        currentData : action.data
      };
    case RECIEVE_API_TOTAL_DATA: // 지금까지 받은 데이터 중 최신데이터로 변경하여 배열에 저장
      return {
        ...state,
        total : [
          ...state.total, 
          ...action.data
        ].reverse()
        .filter((arr, index, callback) => index ===callback.findIndex((loc) => loc.stationName === arr.stationName))
        .reverse()
      }
    case ADD_TO_FAVORITE:
      console.log('ADD_TO_FAVORITE',state, action.data);
      return { 
        ...state,
        bookMark : state.bookMark.concat(action.data)
      };
    case REMOVE_TO_FAVORITE:
      console.log('REMOVE_TO_FAVORITE',state, action.data);
      return {
        ...state,
        bookMark : state.bookMark.filter(
          arr => arr.stationName !== action.data.stationName
        )
      }
    default:
      return state;
  }
}
