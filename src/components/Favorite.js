import { MdStar, MdStarBorder } from "react-icons/md";
import styled from "styled-components";


const PosRight = styled.div`
  position: absolute;
  right: 20px
`;

function Favorite ({data, onClick, isFavorite}){
  const favoriteChange = () => onClick(!isFavorite, data);
  return(
    <PosRight onClick={favoriteChange}>
      {isFavorite?<MdStar/> : <MdStarBorder/>}
    </PosRight>
  )
}

export default Favorite;