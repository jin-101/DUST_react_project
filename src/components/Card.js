import React from "react";
import styled from "styled-components";
import Favorite from "./Favorite";
import '../main.scss';

const Rect = styled.div`
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  margin: 20px;
  background: ${props => props.color || 'white'};
  border-radius : 10px;
  font-size: 25px;
  color: white;
`;
const DustGradeText = styled.div`
  display: inline;
  padding: 10px;
  margin: 10px;
  border-radius:10px;
  background-color: white;
  color: ${props => props.color || 'black'};
`;

const makeInfomation = (grade) => {
  switch(grade){
    case '1':
      return {
        text : '좋음',
        color: '#6698cb' //blue
      };
    case '2':
      return {
        text : '보통',
        color: '#82c8a0' //green
      };
    case '3':
      return {
        text : '한때 나쁨',
        color: '#f0d264' //yellow
      };
    case '4':
      return {
        text : '나쁨',
        color: 'orange' //orange
      };
    case '5':
      return {
        text : '매우 나쁨',
        color: '#fa5a5a' //red
      };
    default:
      return {
        text : '알수없음',
        color: 'gray'
      }
  }
}
function Card ({stationName, pm10Value, pm10Grade, dataTime, sidoName}) {
  const {text, color} = makeInfomation(pm10Grade);
  return (
    <Rect color={color}>
        <div className="flex">
          <div className="flex">
            <div>{stationName}</div>
            <div className="flex pos-b fs-small mg-left-s mg-bottom-s">{sidoName}</div>
          </div>
          <Favorite/>
        </div>
        <div className="flex pos-mc">
          <DustGradeText className="fs-large" color={color}>{text}</DustGradeText>
        </div>
        <div className="fs-small">
          <div className="flex pos-c mg-small">미세먼지 수치 : {pm10Value}</div>
          <div className="flex pos-c mg-small">({dataTime} 기준)</div>
        </div>
    </Rect>
  )
}

export default Card;
