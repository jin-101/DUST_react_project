import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Loading from "../components/Loading";
import { regionList } from "../datas";

const CardsStyle = styled.div`
  height: 600px;
  overflow : auto;
`;

function TotalRegion ({onChange}) {  
  const currentTotalState = useSelector(state => state.dust.currentTotalState);
  const currentData = useSelector(state => state.dust.currentData);
  const bookMark = useSelector(state => state.dust.bookMark);
  return (
    <>
      <div className='flex pos-mc mg-small h-50'>
        {Object.entries(currentTotalState).map((els, index) => {
          return <Dropdown key={index} name={els[0]} val={els[1]} list={regionList} onChange={onChange}/>
        })}     
      </div>
      <div>
        <CardsStyle>
          { currentData.length===0 
              ? <Loading/>
              : currentData.map((el,index) => {
                  const bool = bookMark.some(origin => origin.stationName === el.stationName);
                  return (
                    <Card 
                      data = {el}
                      key = {index}
                      existFavorite = {true}
                      isFavorite = {bool}
                    />
                  )
                })
          }
        </CardsStyle>
      </div>
    </>
  )
}

export default TotalRegion;