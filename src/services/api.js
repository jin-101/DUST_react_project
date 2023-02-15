// 사용자 정보
export const initialMyRegionState = {
  sidoName:'경기',
  stationName: '교문동'
}
export const initialTotalRegionState = {
sidoName:'서울'
}
export const initialMyFavoriteRegion = [
{sidoName:'대구',stationName:'남산1동'},
{sidoName:'서울',stationName:'정릉로'},
{sidoName:'서울',stationName:'동대문구'},
{sidoName:'경기',stationName:'금곡동'}
]

export const makeApiParams = sidoName => {
  const params = {
    serviceKey: 'yPJqaMFS6oMo9IfIkwzoXlArnowxkiCn0mcTI6FXvz%2F8Ho5E%2BE%2B4vYaequ2E8lLPGOAEABqJXiegFBkRp2qrvQ%3D%3D',
    returnType:'json',
    numOfRows:'100',
    pageNo:'1',
    ver:'1.0',
  }
  const {serviceKey,returnType,numOfRows,pageNo,ver} = params;
  return `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&sidoName=${sidoName}&ver=${ver}`;
}