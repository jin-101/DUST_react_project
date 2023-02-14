import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Loading from "../components/Loading";
import { regionList } from "../datas";

const Cards = styled.div`
  height: 600px;
  overflow : auto;
`;

function MyRegion ({value, onChange}) {
  const {currentData} = useSelector(state => state.favorite);
  // console.log('0번일때 내용카드 만들기', {currentData,value});
  const myRegion = currentData.filter((el) => el.stationName === value.stationName)[0] || currentData[0];
  if(!currentData.length === 0) return <Loading/>
  return (
    <> 
      <div className='flex pos-mc mg-small h-50'> 
      {Object.entries(value).map((els, index) => {
          const lists = index===0 ? regionList : currentData.map(el => el.stationName)
          return <Dropdown key={index} name={els[0]} val={els[1]} list={lists} onChange={onChange}/>
      })}
      </div>
      <div>
        {
          !myRegion 
            ? <Loading/>
            : <Cards>
                <Card data = {myRegion}/>
              </Cards>
        }
      </div>
    </>

  )
}

export default MyRegion;