import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #181A1B;
  color: #fff;
  padding: px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #0056b3;
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  @media (max-width: 900px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

export const Logos = styled.img`
  margin-right: 20px;
  width: 200px;
  height: 100px;
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

export const SocialContainer = styled.div`
  flex: 1;
  margin-right: 100px;
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

export const SocialTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  word-break: break-word;
`;

export const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SocialIcon = styled.a`
  color: #fff;
  font-size: 24px;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    color: #16255C;
  }
`;

export const LocationContainer = styled.div`
  flex: 1;
  margin-bottom: 0px;
  margin-left: 100px;
  word-break: break-word !important;
  @media (max-width: 900px) {
    margin-left: 0px;
    order: 3;
    margin-top: 20px;
    word-break: break-word !important;
  }
`;

