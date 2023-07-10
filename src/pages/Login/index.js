import Header from '../../components/header/header';
import Login from '../../components/login/login';
import Footer from '../../components/footer/footer';
import styled from 'styled-components';

export default function LoginPage() {
  return (
    <Main>
      <Header/>
      <Login/>
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
