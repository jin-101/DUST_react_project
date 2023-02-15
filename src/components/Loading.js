import styled from 'styled-components';
import  { Circles } from 'react-loader-spinner'

const LoadingPage = styled.div`
  height: 550px;
`;

function Loading () {
  return (
      <LoadingPage className='flex pos-mc'>
        <Circles
          height="200"
          width="200"
          radius="9"
          color="pink"
          ariaLabel="loading"
        />
      </LoadingPage>
  )
}

export default Loading;