// import { useState } from "react";
import { useState } from "react";
import { MdStar, MdStarBorder } from "react-icons/md";
import styled from "styled-components";

const PosRight = styled.div`
  position: absolute;
  right: 20px
`;

function Favorite ({data, onClick, favorite=true}){
  // const [bool, setBool] = useState(favorite)
  const favoriteChange = (e) => {
    console.log(favorite);
    // setBool(prev => !prev)
    onClick(favorite, data);
  }
  console.log(favorite);
  return(
    <PosRight onClick={favoriteChange}>
      {favorite?<MdStarBorder/>:<MdStar/>}
    </PosRight>
  )
}

export default Favorite;