import { MdStar, MdStarBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addToFavorite, removeToFavorite } from "../actions";


const PosRight = styled.div`
  position: absolute;
  right: 20px
`;

function Favorite ({data, isFavorite}){
  const dispatch = useDispatch();
  const onClick = (bool, data) => {
    if (bool) dispatch(addToFavorite(data))
    else dispatch(removeToFavorite(data))
  }
  return(
    <PosRight onClick={() => onClick(!isFavorite, data)}>
      {isFavorite?<MdStar/> : <MdStarBorder/>}
    </PosRight>
  )
}

export default Favorite;