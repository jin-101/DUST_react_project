import React from "react";
import styled from "styled-components";
import Favorite from "./Favorite";
import '../main.scss';
import { makeInfomation } from "../datas";

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

function Card ({data, existFavorite = false, onClick, favorite}) {
  const {stationName, pm10Value, pm10Grade, dataTime, sidoName} = data;
  const {text, color} = makeInfomation(pm10Grade);
  return (
    <Rect color={color}>
        <div className="flex">
          <div className="flex">
            <div>{stationName}</div>
            <div className="flex pos-b fs-small mg-left-s mg-bottom-s">{sidoName}</div>
          </div>
          { existFavorite ? <Favorite data={data} onClick={onClick} favorite={favorite}/> : null }
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
