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

function TotalRegion ({value, onChange, onClick}) {  
  const {currentData, bookMark} = useSelector(state => state.favorite);
  // console.log('1번일 때 내용카드만들기', currentData);
  return (
    <>
      <div className='flex pos-mc mg-small h-50'>
        {Object.entries(value).map((els, index) => {
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
                      onClick = {onClick}
                    />
                  )
                })
          }
          {
            // dataSet.length===0 
            // // || !bookMark 
            // ? <Loading/>
            // : dataSet.map((el,index) => {
            //     const bool = bookMark.some(origin => origin.stationName === el.stationName);
            //     return (
            //       <Card 
            //         data = {el}
            //         key = {index}
            //         existFavorite = {true}
            //         isFavorite = {bool}
            //         onClick = {onClick}
            //       />
            //     )
            //   })
            
          }
        </CardsStyle>
      </div>
    </>
  )
}

export default TotalRegion;