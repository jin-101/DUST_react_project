import { combineReducers } from 'redux';
import favorite from './favorite'

const rootReducer = combineReducers({
  // 리듀서들을 입력한다.
  favorite
});

export default rootReducer;
