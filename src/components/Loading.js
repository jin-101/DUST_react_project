import styled from 'styled-components';

const LoadingPage = styled.div`
  
  height: 600px;
  background-color: tomato;

`;

function Loading () {
  return (
    <LoadingPage>
      로딩 중입니다.
    </LoadingPage>
  )
}

export default Loading;