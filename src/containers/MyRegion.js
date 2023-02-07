import styled from "styled-components";
import Card from "../components/Card";
import Loading from "../components/Loading";

const Cards = styled.div`
  height: 600px;
  overflow : auto;
`;

function MyRegion ({data, val}) {
  console.log('0번일때 내용카드 만들기');
  if (!data) return <Loading/>
  const myRegion = data.filter((el) => el.stationName === val)[0] || data[0];
  if (!myRegion) return <Loading/>
  return (
  <>
    <Cards>
        <Card 
          data = {myRegion}
        />
    </Cards>
  </>
  )
}

export default MyRegion;