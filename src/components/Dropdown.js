import uuid from "react-uuid";

function Dropdown ({name, val, list, onChange}){
  return (
      <select name={name} onChange={(e)=>{onChange(e)}} key={uuid()} defaultValue={val}>
        {list.map((el,i) => {
          return <option key={i} value={el}>{el}</option>;
        })}
      </select>
  )
}

export default Dropdown;