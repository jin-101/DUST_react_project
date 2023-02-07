import styled from "styled-components";
import Card from "../components/Card";

const Cards = styled.div`
  height: 600px;
  overflow : auto;
`;

function TotalRegion ({data}) {
  return (
      <Cards>
        {data.map((el,index) => 
          <Card 
            stationName={el.stationName} 
            pm10Value={el.pm10Value} 
            pm10Grade={el.pm10Grade} 
            dataTime={el.dataTime} 
            sidoName={el.sidoName} 
            key={index}
          />)}
      </Cards>
  )
}

export default TotalRegion;