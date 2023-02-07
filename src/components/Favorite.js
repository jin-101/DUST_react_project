import { useState } from "react";
import { MdStar, MdStarBorder } from "react-icons/md";
import styled from "styled-components";

const PosRight = styled.div`
  position: absolute;
  right: 20px
`;

function Favorite (){
  const [favoriteState, setFavoriteState] = useState(false);
  const favoriteChange = () => {
    setFavoriteState(prev => !prev);
  }
  return(
    <PosRight onClick={favoriteChange}>
      {favoriteState?<MdStar/>:<MdStarBorder/>}
    </PosRight>
  )
}

export default Favorite;