import { ADD_TO_FAVORITE, CURRENT_MY_REGION, CURRENT_TOTAL_REGION, PAGE_UPDATE, RECIEVE_API_DATA, RECIEVE_API_TOTAL_DATA, REMOVE_TO_FAVORITE } from "../constants";
import { initialMyRegionState, initialTotalRegionState } from "../services/api";

//action 함수
export const receiveApiData = (data=[]) => ({type: RECIEVE_API_DATA, data})
export const receiveApiTotalData = data => ({type: RECIEVE_API_TOTAL_DATA, data})
export const addToFavorite = data => ({type: ADD_TO_FAVORITE, data})
export const removeToFavorite = data => ({type: REMOVE_TO_FAVORITE, data}) 
export const currentMyRegion = (data = initialMyRegionState) => ({type:CURRENT_MY_REGION, data})
export const currentTotalRegion = (data = initialTotalRegionState) => ({type:CURRENT_TOTAL_REGION, data})
export const pageUpdate = data => ({type:PAGE_UPDATE, data})
