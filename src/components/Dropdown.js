import uuid from "react-uuid";
import styled from "styled-components";

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

function Dropdown ({name, val, list, onChange}){
  // console.log('상위탭 만들기 dropdown');
  return (
    <div className='flex pos-mc mg-small w-100per h-100per'>
      <SelectBox name={name} onChange={(e)=>{onChange(e)}} key={uuid()} defaultValue={val}>
        {list.map((el,i) => {
          return <option key={i} value={el}>{el}</option>;
        })}
      </SelectBox>
    </div>
  )
}

export default Dropdown;