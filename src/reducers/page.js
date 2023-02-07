/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DIFF = 'counter/SET_DIFF';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setDiff = diff => ({ type: SET_DIFF, diff });

/* 초기 상태 선언 */
const initialState = 1;

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function trans(state = initialState, action) {
  switch (action.type) {
    case 0:
      return {
        ...state,
        diff: action.diff
      };
    case 1:
      return {
        ...state,
        number: state.number + state.diff
      };
    case 2:
      return {
        ...state,
        number: state.number - state.diff
      };
    default:
      return state;
  }
}
