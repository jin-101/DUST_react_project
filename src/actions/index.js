import { initialMyRegionState, initialTotalRegionState } from "../datas";

// action 타입
export const RECIEVE_API_DATA = 'RECIEVE_API_DATA';
export const RECIEVE_API_TOTAL_DATA = 'RECIEVE_API_TOTAL_DATA';
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const REMOVE_TO_FAVORITE = 'REMOVE_TO_FAVORITE';
export const CURRENT_MY_REGION = 'CURRENT_MY_REGION';
export const CURRENT_TOTAL_REGION = 'CURRENT_TOTAL_REGION';


//action 함수
export const receiveCurrentData = (data=[]) => ({type: RECIEVE_API_DATA, data})
export const receiveTotalData = data => ({type: RECIEVE_API_TOTAL_DATA, data})
export const addFavorite = data => ({type: ADD_TO_FAVORITE, data})
export const removeFavorite = data => ({type: REMOVE_TO_FAVORITE, data}) 
export const currentMyRegion = (data = initialMyRegionState) => ({type:CURRENT_MY_REGION, data})
export const currentTotalRegion = (data = initialTotalRegionState) => ({type:CURRENT_TOTAL_REGION, data})

