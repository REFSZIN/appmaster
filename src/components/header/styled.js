import styled from 'styled-components';

export const LogoutButton = styled.button`
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  padding: 8px;
  border: 1px solid #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  width: 90px;
  background-color: rgb(0, 123, 255);
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
  margin-left: 10px;
  width: 200px;
  @media (max-width: 1180px) {
    width: 100% !important;
    margin: 20px;
    flex-direction: column;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  @media (max-width: 550px) {
    width: 300px !important;
    flex-direction: column;
  }
`;

export const SearchMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  @media (max-width: 1180px) {
    width: 100% !important;
    margin: 20px;
    flex-direction: column;
  }
  @media (max-width: 1115px) {
    width: 100% !important;
    margin: 20px;
    flex-direction: column;
  }
`;

export const SortButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
    font-weight: bold;
  word-break: break-word;
    @media (max-width: 550px) {
    margin-left: 0px;
    margin-top: 10px;
  }
  @media (max-width: 1180px) {
    width: 100% !important;
    margin: 0px;
    margin-top: 20px;
  }
  &:hover {
    background-color: rgb(0, 123, 255);
  }
`;

export const BtnsMobile = styled.div`
    width: 100%;
    display: flex;
    -webkit-box-pack: end;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
    align-content: center;
    flex-wrap: nowrap;
`;

export const DefaultSortButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin-left: 10px;
  word-break: break-word;
  
    @media (max-width: 1180px) {
    width: 100% !important;
    margin: 0px;
    margin-top: 20px;
  }
  &:hover {
    background-color: rgb(0, 123, 255);
  }
`;

export const BoxBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 1180px) {
    display: none;
  }
`;

export const SearchContainerBusca = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 0px 20px 20px;
  @media (max-width: 1080px) {
    width: 100% !important;
    margin: 0px;
    margin-top: 20px;
  }
`;

export const GenreSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
  margin-right: 10px;
  @media (max-width: 1180px) {
    width: 100% !important;
    margin: 0px;
    margin-top: 20px;
  }
`;


export const Button = styled.button`
  width: 150px;
  margin-right: 20px;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: bold;
  word-break: break-word;
  @media (max-width: 1180px) {
    width: 100% !important;
    margin: 0px;
    margin-top: 20px;
  }
  &:hover {
    background-color: rgb(0, 123, 255);
  }
`;

export const HeaderContainer = styled.header`
  white-space: wrap;
  background-color: dark;
  height: 70px;
  width: 100vw;
  display: flex;
  align-items: center;
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

export const LogoImg = styled.img`
  width: 60px;
  height: 60px;
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

export const MenuHamburg = styled.div`
`;

export const LogoContainer = styled.div`
`;