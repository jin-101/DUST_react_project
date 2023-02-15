import { MdStar, MdStarBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addFavorite, removeFavorite } from "../actions";


const PosRight = styled.div`
  position: absolute;
  right: 20px
`;

function Favorite ({data, isFavorite}){
  const dispatch = useDispatch();
  const onClick = (bool, data) => {
    if (bool) dispatch(addFavorite(data))
    else dispatch(removeFavorite(data))
  }
  return(
    <PosRight onClick={() => onClick(!isFavorite, data)}>
      {isFavorite?<MdStar/> : <MdStarBorder/>}
    </PosRight>
  )
}

export default Favorite;