import styled from "styled-components";
import Card from "../components/Card";
import Loading from "../components/Loading";

const CardsStyle = styled.div`
  height: 600px;
  overflow : auto;
`;

function TotalRegion ({data, favoriteData, onClick, isAll=false}) {  
  console.log('1번일 때 내용카드만들기');
  if (!data || !favoriteData) return <Loading/>
  const newData = isAll ? data.filter(x => favoriteData.includes(x.stationName)):data
  // console.log(favoriteData,data);
  return (
    <>
      <CardsStyle>
        {newData.map((el,index) => {
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