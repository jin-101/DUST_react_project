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

function MyRegion ({onChange}) {
  const currentMyState = useSelector(state => state.dust.currentMyState);
  const currentData = useSelector(state => state.dust.currentData);
  const myRegion = currentData.filter((el) => el.stationName === currentMyState.stationName)[0] || currentData[0];
  if(!currentData.length === 0) return <Loading/>
  return (
    <> 
      <div className='flex pos-mc mg-small h-50'> 
      {Object.entries(currentMyState).map((els, index) => {
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