import { navigatorMenu } from "../utils";
import styled from 'styled-components';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { currentMyRegion, currentTotalRegion, pageUpdate } from "../actions";

const ButtonStyle = styled.div`
  width: 33%;
  height: 100px;
  margin:10px;
`;

function Button () {
  const dispatch = useDispatch();
  const naviAction = useCallback((page) => {
    dispatch(pageUpdate(page))
    switch (page){
      case 0:
        return dispatch(currentMyRegion())
      case 1:
        return dispatch(currentTotalRegion())
      default:
        return null;
    }
  },[dispatch])
  return (
    <div className='flex pos-mc h-100'>
      {navigatorMenu.map(item => {
        return (
          <ButtonStyle key={item.index} onClick={()=>{naviAction(item.index)}}>
            <div className='flex pos-mc mg-medium fs-medium'>{item.icon}</div>
            <div className='flex pos-mc mg-small'>{item.text}</div>
          </ButtonStyle>
        )
      })}
    </div>
  )
}

export default Button;