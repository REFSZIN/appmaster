import Header from '../../components/header';
import Games from '../../components/games';
import Footer from '../../components/footer';
import styled from 'styled-components';

export default function Home() {
  return (
    <Main>
      <Header/>
      <Games/>
      <Footer/>
    </Main>
  );
}

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  padding: 10px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
`;
