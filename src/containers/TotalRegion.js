import styled from "styled-components";
import Card from "../components/Card";
import Loading from "../components/Loading";

const CardsStyle = styled.div`
  height: 600px;
  overflow : auto;
`;

function TotalRegion ({data, favoriteData, onClick}) {  
  console.log('1번일 때 내용카드만들기');
  if (!data || !favoriteData) return <Loading/>
  // console.log(favoriteData,data);
  return (
    <>
      <CardsStyle>
        {data.map((el,index) => {
          const bool = favoriteData.includes(el.stationName);
          return <Card 
            data = {el}
            key = {index}
            existFavorite = {true}
            favorite = {!bool}
            onClick = {onClick}
          />})}
      </CardsStyle>
      </>
  )
}

export default TotalRegion;