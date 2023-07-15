import { FooterContainer, Logos, SocialContainer, SocialTitle, SocialIconsContainer, SocialIcon, LocationContainer } from './styled';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <FooterContainer>
      <SocialContainer>
        <SocialTitle>Redes Sociais:</SocialTitle>
        <SocialIconsContainer>
          <SocialIcon href='https://www.linkedin.com/company/appmasters.io/' target='_blank' alt='Linkedin Appmasters'>
            <FaLinkedin size={24} />
          </SocialIcon>
          <SocialIcon href='https://www.instagram.com/appmasters.io/' target='_blank' alt='Instagram Appmasters'>
            <FaInstagram size={24} />
          </SocialIcon>
        </SocialIconsContainer>
      </SocialContainer>
      <SocialIcon href='https://www.appmasters.io/' target='_blank' title="AppMasters" alt='Site Appmasters'>
        <Logos src='https://www.appmasters.io/favicon.png' alt='Site Appmasters'/>
      </SocialIcon>
      <LocationContainer>
        <div>
          <p>© { new Date().getFullYear() } Master👾Games.</p>
        </div>
      </LocationContainer>
    </FooterContainer>
  );
}