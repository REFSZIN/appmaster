import { FooterContainer, Logos, SocialContainer, SocialTitle, SocialIconsContainer, SocialIcon, LocationContainer } from './styled';
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
      <SocialIcon href='https://www.appmasters.io/' target='_blank' title="AppMasters">
        <Logos src='https://www.appmasters.io/favicon.png' alt='a'/>
      </SocialIcon>
      <LocationContainer>
        <div>
          <p>© { new Date().getFullYear() } Master👾Games.</p>
        </div>
      </LocationContainer>
    </FooterContainer>
  );
}