import { ADD_TO_FAVORITE, CURRENT_MY_REGION, CURRENT_TOTAL_REGION, RECIEVE_API_DATA, RECIEVE_API_TOTAL_DATA, REMOVE_TO_FAVORITE } from '../actions';
import { initialData } from '../datas';

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
        totalData : [
          ...state.totalData, 
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
    case CURRENT_MY_REGION:
      return {
        ...state,
        currentMyState : {
          ...state.currentMyState,
          'stationName':'',
           ...action.data
        }
      }
    case CURRENT_TOTAL_REGION:
      return {
        ...state,
        currentTotalState : {
          ...action.data
        }
      }
    default:
      return state;
  }
}
