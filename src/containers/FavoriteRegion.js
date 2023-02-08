import styled from "styled-components";
import Card from "../components/Card";
import Loading from "../components/Loading";

const CardsStyle = styled.div`
  height: 600px;
  overflow : auto;
`;

function FavoriteRegion ({data, favoriteData, onClick}) {  
  console.log('1번일 때 내용카드만들기', data, favoriteData);
  if (!data || !favoriteData) return <Loading/>
  const newData =  data.filter(x => favoriteData.some(origin => origin.stationName === x.stationName))
  // console.log(favoriteData,data);
  return (
    <>
      <div className='flex pos-mc mg-small h-50'></div>
      <div>
        <CardsStyle>
            {newData.map((el,index) => {
              return <Card 
                data = {el}
                key = {index}
                existFavorite = {true}
                isFavorite = {true}
                onClick = {onClick}
              />})}
          </CardsStyle>
      </div>
      </>
  )
}

export default FavoriteRegion;