import { regionList } from "../datas";

function Dropdown ({onChange}){
  return (
      <select onChange={(e)=>{onChange(e.target.value)}}>
        {regionList.map((el,i) => {
          return <option key={i} defaultValue={'서울'}>{el}</option>;
        })}
      </select>
  )
}

export default Dropdown;