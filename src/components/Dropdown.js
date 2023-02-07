const regionList = ['서울','부산','대구','인천','광주','대전','울산','경기','강원','충남','충북','전남','전북','경남','경북','제주','세종','전국']

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