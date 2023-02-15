import { navigatorMenu } from "../datas";
import styled from 'styled-components';
const ButtonStyle = styled.button`
  width: 33%;
  height: 100px;
  margin:10px;
`;

function Button ({onClick}) {
  return (
    <div className='flex pos-mc h-100'>
      {navigatorMenu.map(item => {
        return (
          <ButtonStyle key={item.index} onClick={()=>{onClick(item.index)}}>
            <div className='flex pos-mc mg-medium fs-medium'>{item.icon}</div>
            <div className='flex pos-mc mg-small'>{item.text}</div>
          </ButtonStyle>
        )
      })}
    </div>
  )
}

export default Button;