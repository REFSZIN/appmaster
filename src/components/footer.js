import styled from 'styled-components';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <FooterContainer>
      <SocialContainer>
        <SocialTitle>Redes Sociais:</SocialTitle>
        <SocialIconsContainer>
          <SocialIcon href='https://www.linkedin.com/company/appmasters.io/' target='_blank'>
            <FaLinkedin size={24} />
          </SocialIcon>
          <SocialIcon href='https://www.instagram.com/appmasters.io/' target='_blank'>
            <FaInstagram size={24} />
          </SocialIcon>
        </SocialIconsContainer>
      </SocialContainer>
      <Logos src='https://www.appmasters.io/favicon.png' alt='a'></Logos>
      <LocationContainer>
      </LocationContainer>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #181A1B;
  color: #fff;
  padding: 6px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #aaa;
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  @media (max-width: 900px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const Logos = styled.img`
  margin-right: 20px;
  width: 200px;
  height: 150px;
  border:1px solid blue;    
  height:100px;
  border-radius:50%;
  -moz-border-radius:50%;
  -webkit-border-radius:50%;
  width:100px;
  @media (max-width: 900px) {
    flex-direction: column-reverse;
    text-align: center;
    margin-top: 30px;
    margin-right: 20px;
  }
`;

const SocialContainer = styled.div`
  flex: 1;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    margin-right: 20px;
    margin-bottom: 0px;  
    margin-top: 20px;
    flex: 0;
  }
`;

const SocialTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  word-break: break-word;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 24px;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    color: #16255C;
  }
`;

const LocationContainer = styled.div`
  flex: 1;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    order: 3;
    margin-top: 20px;
    display: none !important;
  }
`;

