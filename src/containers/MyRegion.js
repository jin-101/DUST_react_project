import styled from "styled-components";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Loading from "../components/Loading";
import { regionList } from "../datas";

const Cards = styled.div`
  height: 600px;
  overflow : auto;
`;

function MyRegion ({dataSet, value, onChange}) {
  console.log('0번일때 내용카드 만들기', {dataSet,value});
  const {data, list} = dataSet;
  if (!data.length===0) return <Loading/>
  const myRegion = data.filter((el) => el.stationName === value.stationName)[0] || data[0];
 
  return (
    <> 
      <div className='flex pos-mc mg-small h-50'> 
      {Object.entries(value).map((els, index) => {
          const lists = index===0 ? regionList : list
          return <Dropdown key={index} name={els[0]} val={els[1]} list={lists} onChange={onChange}/>
      })}
      </div>
      <div>
        {
          !myRegion 
          ? <Loading/>
          : <Cards>
              <Card 
                data = {myRegion}
              />
            </Cards>
        }
      </div>
    </>

  )
}

export default MyRegion;