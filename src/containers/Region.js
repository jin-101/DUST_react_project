import styled from "styled-components";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Loading from "../components/Loading";
import { regionList } from "../datas";

const Cards = styled.div`
  height: 600px;
  overflow : auto;
`;

function Region ({data, onChange, user}) {  
  console.log(data);
  console.log(user);
  return (
    <>
    <div className='flex pos-mc mg-small'>
      <Dropdown name='first' user={user} list={regionList} onChange={onChange}/>
      {(user['second'])?<Dropdown name='second' user={user} list={data.map(el => el.stationName)} onChange={onChange}/>
       :null   
      }
    </div>
    {!data ?<Loading/>:
      <Cards>
        {data.map((el,index) => 
          <Card 
            stationName={el.stationName} 
            pm10Value={el.pm10Value} 
            pm10Grade={el.pm10Grade} 
            dataTime={el.dataTime} 
            sidoName={el.sidoName} 
            key={index}
          />)}
      </Cards>}
      </>
  )
}

export default Region;