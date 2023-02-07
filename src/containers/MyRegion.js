import styled from "styled-components";
import Card from "../components/Card";
import Loading from "../components/Loading";

const Cards = styled.div`
  height: 600px;
  overflow : auto;
`;

function MyRegion ({data, val}) {
  if (!data) return <Loading/>
  const myRegion = data.filter((el) => el.stationName === val)[0] || data[0];
  if (!myRegion) return <Loading/>
  return (
  <>
    <Cards>
        <Card 
          stationName={myRegion.stationName} 
          pm10Value={myRegion.pm10Value} 
          pm10Grade={myRegion.pm10Grade} 
          dataTime={myRegion.dataTime} 
          sidoName={myRegion.sidoName}
        />
    </Cards>
  </>
  )
}

export default MyRegion;