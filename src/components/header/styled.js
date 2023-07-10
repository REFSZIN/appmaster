import styled from 'styled-components';

export const LogoutButton = styled.button`
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  width: 90px;
  &:hover {
    background-color: #0026b3;
  }
`;

export const HeaderContainer = styled.header`
  white-space: wrap;
  background-color: dark;
  height: 70px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  background:rgba(0, 0, 0, 0.1);
	-webkit-backdrop-filter: blur(40px);
	backdrop-filter: blur(10px);
  margin-top: -10px;
  z-index: 2;
  mask-border: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 10%, rgb(255, 255, 255) 40%);
  animation: flipInX 1s;
  @media (max-width: 400px){
    padding: 0 20px;
}
`;

export const MenuHamburg = styled.div`
`;

export const LogoContainer = styled.div`
`;

export const LogoImg = styled.img`
  width: 60px;
  height: 60px;
  @media (max-width: 400px){
  width: 50px;
}
`;

export const NavItem = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #555;
  margin: 10px;
  cursor: pointer;
  font-family: "Lexend Deca", sans-serif;
  font-family: 'Inter', sans-serif;
  font-family: 'Montserrat', sans-serif;
  font-family: 'Permanent Marker', cursive;
  &:hover {
    color: #fff;
  }
`;

export const ScrollToTopButton = styled.button`
  position: fixed;
  top: 90vh;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 60%;
  background-color: #0d71ff;
  color: #fff;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  z-index: 3;
`;