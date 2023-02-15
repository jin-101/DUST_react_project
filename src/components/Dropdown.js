import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import styled from "styled-components";
import { currentMyRegion, currentTotalRegion } from "../actions";

const SelectBox = styled.select`
    margin: 0;
    min-width: 0;
    display: block;
    width: 100%;
    padding: 8px 8px;
    font-size: inherit;
    line-height: inherit;
    border: 1px solid;
    border-radius: 4px;
    color: inherit;
    background-color: transparent;
`;

function Dropdown ({name, val, list}){
    const { pageState } = useSelector(state => state.dust);
    const dispatch = useDispatch();

    const dropChange = useCallback((e) => {
    const {name, value} = e.target;
    switch (pageState) {
      case 0:
        dispatch(currentMyRegion({[name]:value}))
        return;
      case 1:
        dispatch(currentTotalRegion({[name]:value}))
        return;
      default:
        return null;
    }
  },[pageState, dispatch])

  return (
    <div className='flex pos-mc mg-small w-100per h-100per'>
      <SelectBox name={name} onChange={(e)=>{dropChange(e)}} key={uuid()} defaultValue={val}>
        {list.map((el,i) => {
          return <option key={i} value={el}>{el}</option>;
        })}
      </SelectBox>
    </div>
  )
}

export default Dropdown;