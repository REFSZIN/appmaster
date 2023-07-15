import styled, { css } from 'styled-components';
import { FaPlayCircle } from 'react-icons/fa';

export const FavoriteIcon = styled.span`
  font-size: 40px;
  margin-right: 20px;
  margin-left: 4px;
  cursor: pointer;
  &.favorite {
    color: red;
    animation: heartBeat 1s;
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StarIcon = styled.span`
  font-size: 30px;
  cursor: pointer;
  &.rated {
    color: yellow;
    animation: rotateIn 2s;
  }
`;

export const GamesContainer = styled.section`
  margin-bottom: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const GamesTitle = styled.h1`
  font-size: 34px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Franklin Gothic Medium', sans-serif;
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

export const SearchContainerBusca = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  @media (max-width: 550px) {
    width: 300px !important;
  }
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
  @media (max-width: 550px) {
    margin-left: 0px;
    margin-top: 10px;
  }
`;

export const ContainerLoader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 400px;
  animation: fadeIn 2s;
`;

export const GifLoader = styled.img`
  width: 200px;
  height: 200px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
  width: 200px;
  @media (max-width: 468px) {
    width: 130px !important;
  }
`;

export const GenreSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
  @media (max-width: 468px) {
    width: 150px !important;
  }
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  @media (max-width: 900px) {
    margin-bottom: 200px !important;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: red;
  margin-top: 20px;
  width: 320px;
  word-break: break-word;
`;

export const NoResultsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  word-break: break-word;
`;

export const ErrorAviso = styled.div`
  margin-top: 20px;
  margin-bottom: 100px !important;
  & img{
    margin-left: 22px;
  }
  @media (max-width: 900px) {
    margin-bottom: 200px !important;
  }
`;

export const ErrorConteiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const GamesGrid = styled.div`
  transition: all 1s ease 0s;
  transition: transform 0.3s ease-in-out;
  display: grid;
  grid-template-columns: repeat(3, minmax(420px, 1fr));
  padding: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 900px) {
    margin-bottom: 150px !important;
  }
`;

export const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0000;
  padding: 30px;
  border-radius: 4px;
  animation: fadeInUp 1s;
  background-image: linear-gradient(
    163deg,
    rgba(0,0,0,0.5) 80%,
    #181A1B 100%
  );
  border-radius: 20px;
  transition: all 0.3s;
  margin: 20px;
  text-shadow: 0 0 1px rgb(187, 0, 255), 0 0 2px rgb(75, 5, 83),
    0 0 4px #0fa, 0 0 1px #0fa, 0 0 11px rgb(95, 11, 97);
  border-radius: 48px;
  background-color: rgba(0,0,0,0.5);
  box-shadow: 6px 6px 12px #181A1B;
  &:hover {
    box-shadow: 0px 0px 20px 1px #007bff;;
    & img{
      transform: scale(1.02);
    }
  }
  position: relative;
  @media (max-width: 1000px) {
    padding: 25px;
  }
  @media (max-width: 425px) {
    padding: 20px;
  }
`;
export const YTiframe = styled.iframe`
  max-width: 100%;
  height: ${props => props.height}px;
  margin-bottom: 10px;
  border-radius: 20px;
  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }
`;


export const RefreshButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const GameTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  text-align: center;
`;

export const GameDescription = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  @media (max-width: 550px) {
    font-size: 13px;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

export const GameDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  &:last-child {
    margin-bottom: 20px !important;
  }
`;

export const GameDetail = styled.span`
  font-size: 14px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 550px) {
    font-size: 12px;
  }
  @media (max-width: 400px) {
    font-size: 10px;
  }
`;

export const GameLink = styled.a`
  display: inline-block;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px !important; 
  &:hover {
    ${({ glowOnHover }) =>
      glowOnHover &&
      css`
        background:  #0056b3;
        z-index: 0;
        position: absolute;
        overflow: hidden;
      `}
  }
  @media (max-width: 750px) {
    bottom: 0px;
    margin: 0px;
    margin-top: 40px !important;
  }
  ${({ glowOnHover }) =>
    glowOnHover &&
    css`
      &::before {
        content: '';
        background: linear-gradient(
        45deg,
        rgb(0, 80, 109),
        rgb(0, 87, 149),
        rgb(0, 99, 219),
        rgb(0, 255, 213),
        rgb(0, 43, 255),
        rgb(0, 43, 265),
        rgb(0, 86, 179),
        rgb(0, 81, 142)
        );
        position: absolute;
        top: -2px;
        left: -2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: glowing 20s linear infinite;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        border-radius: 10px;
      }

      &:active {
        color: #000;
      }

      &:active::after {
        background: transparent;
      }

      &:hover::before {
        opacity: 1;
      }

      &::after {
        z-index: -1;
        content: '';
      }

      @keyframes glowing {
        0% {
          background-position: 0 0;
        }
        50% {
          background-position: 400% 0;
        }
        100% {
          background-position: 0 0;
        }
      }
    `}
`;

export const Button = styled.button`
  width: 150px;
  margin-right: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: bold;
  word-break: break-word;
    @media (max-width: 550px) {
    margin: 0px;
    margin-top: 10px;
  }
  &:hover {
    cursor: pointer;
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
`;

export const GameImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  height: auto;
  &:hover {
    cursor: pointer;
  }
`;

export const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlayIcon = styled(FaPlayCircle)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: #fff;
  width: 70px;
  height: 70px;
  transition: all 0.3s ease;
  opacity: 0;
`;

export const GameImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

export const GameImageContainer = styled.div`
  position: relative;
  &:hover ${PlayIcon} {
    opacity: 1;
  }
  &:hover ${GameImageOverlay} {
    opacity: 1;
  }
`;