import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";
// import Loading from "../components/Loading";

const CardsStyle = styled.div`
  height: 600px;
  overflow : auto;
`;

function FavoriteRegion ({onClick}) {  
  const {total, bookMark} = useSelector(state => state.favorite);
  console.log('2번일 때 즐겨찾기 카드만들기', {total, bookMark});
  return (
    <>
      <div className='flex pos-mc mg-small h-50'></div>
      <div>
        <CardsStyle>
            {total.filter(x => bookMark.some(origin => origin.stationName === x.stationName)).map((el,index) => {
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