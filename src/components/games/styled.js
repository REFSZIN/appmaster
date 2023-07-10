import styled from 'styled-components';

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
  font-size: 40px;
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
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 468px) {
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
  &:hover {
    background-color: #0056b3;
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
    margin-bottom: 100px !important;
  }
`;

export const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0000;
  padding: 20px;
  border-radius: 4px;
  animation: fadeInUp 1s;
  background-image: linear-gradient(
    163deg,
    rgb(40, 90, 189) 80%,
    #3700ff 100%
  );
  border-radius: 20px;
  transition: all 0.3s;
  margin: 20px;
  text-shadow: 0 0 1px rgb(187, 0, 255), 0 0 2px rgb(75, 5, 83),
    0 0 4px #0fa, 0 0 1px #0fa, 0 0 11px rgb(95, 11, 97);
  &:hover {
    box-shadow: 0px 0px 50px 1px rgba(0, 212, 117, 0.3);
  }
`;

export const GameImage = styled.img`
  max-width: 100%;
  height:auto;
  margin-bottom: 10px;
  &:hover {
    transform: scale(1.01);
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
`;

export const GameDescription = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

export const GameDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
`;

export const GameDetail = styled.span`
  font-size: 12px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
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
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Button = styled.button`
  width: 150px;
  margin-right: 20px;
  padding: 8px 12px;
  border-radius: 4px;
  word-break: break-word;
`;

export const SortButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  word-break: break-word;
`;