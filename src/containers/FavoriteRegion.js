import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";
import Loading from "../components/Loading";

const CardsStyle = styled.div`
  height: 600px;
  overflow : auto;
`;

function FavoriteRegion () { 
  const totalData = useSelector(state => state.favorite.totalData);
  const bookMark = useSelector(state => state.favorite.bookMark);
  const favoriteArray = totalData.filter(x => bookMark.some(origin => origin.stationName === x.stationName));
  const isLoading = favoriteArray.length !== bookMark.length;
  
  return (
    <>
      <div className='flex pos-mc mg-small h-50'></div>
      <div>
        { isLoading
          ? <Loading/>
          : <CardsStyle>
              {favoriteArray.map((el,index) => {
                  return <Card 
                    data = {el}
                    key = {index}
                    existFavorite = {true}
                    isFavorite = {true}
                  />
                })
              }
            </CardsStyle>
        }
      </div>
      </>
  )
}

export default FavoriteRegion;