import styled from "styled-components";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Loading from "../components/Loading";
import { regionList } from "../datas";

const CardsStyle = styled.div`
  height: 600px;
  overflow : auto;
`;

function TotalRegion ({dataSet,  value, onChange, favoriteData, onClick}) {  
  console.log('1번일 때 내용카드만들기', dataSet);
  const {data} = dataSet;
  return (
    <>
      <div className='flex pos-mc mg-small h-50'>
        {Object.entries(value).map((els, index) => {
          return <Dropdown key={index} name={els[0]} val={els[1]} list={regionList} onChange={onChange}/>
        })}     
      </div>
      <div>
        <CardsStyle>
          {
            data.length===0 || !favoriteData 
            ? <Loading/>
            : data.map((el,index) => {
              const bool = favoriteData.some(origin => origin.stationName === el.stationName);
                console.log(bool);
              return <Card 
                data = {el}
                key = {index}
                existFavorite = {true}
                isFavorite = {bool}
                onClick = {onClick}
              />})
          }
        </CardsStyle>
      </div>
    </>
  )
}

export default TotalRegion;