
// export const api = async (sido,pageState) => {
//   const dataSet = {}
//   const getParameters = {
//     serviceKey: 'yPJqaMFS6oMo9IfIkwzoXlArnowxkiCn0mcTI6FXvz%2F8Ho5E%2BE%2B4vYaequ2E8lLPGOAEABqJXiegFBkRp2qrvQ%3D%3D',
//     returnType:'json',
//     numOfRows:'100',
//     pageNo:'1',
//     sidoName: sido[pageState]['first'],
//     ver:'1.0',
//   }
//   fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${getParameters['serviceKey']}&returnType=${getParameters['returnType']}&numOfRows=${getParameters['numOfRows']}&pageNo=${getParameters['pageNo']}&sidoName=${getParameters['sidoName']}&ver=${getParameters['ver']}`)
//   .then(response => response.json())
//   .then(data => dataSet.data = data['response']['body']['items'])
//   console.log(dataSet);
//   return dataSet.data
// }