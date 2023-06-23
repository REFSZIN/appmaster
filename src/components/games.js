/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import GamesContext from '../contexts/GamesContext';
import { toast } from 'react-toastify';
import LoaderGif from '../assets/loaders/loader.gif';
import useGames from '../hooks/api/useGames';

export default function Games() {
  const { gamesData, errormsg, setGamesData } = useContext(GamesContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const { getGames } = useGames();

  useEffect(() => {
    filterGames();
  }, [searchQuery, selectedGenre, gamesData, getGames]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await Promise.race([
        getGames(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 5000)
        ),
      ]);
      setGamesData(response);
      setLoading(false);
      filterGames();
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    setLoading(false);
    if (error.message === 'Timeout') {
      toast.error('O servidor demorou para responder, tente mais tarde.');
    } else if (error.response) {
      const statusCode = error.response.status;
      if ([500, 502, 503, 504, 507, 508, 509].includes(statusCode)) {
        toast.error('O servidor falhou em responder, tente recarregar a página.');
      } else {
        toast.error('O servidor não conseguiu responder por agora, tente voltar novamente mais tarde.');
      }
    } else {
      toast.error('O servidor não conseguiu responder por agora, tente voltar novamente mais tarde.');
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await getGames();
      setGamesData(response);
      setLoading(false);
      fetchData();
      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreSelect = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filterGames = () => {
    let filtered = [];

    if (gamesData !== undefined) {
      filtered = gamesData;

      if (searchQuery !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((game) => game.title.toLowerCase().includes(query));
      }

      if (selectedGenre !== '') {
        filtered = filtered.filter((game) => game.genre === selectedGenre);
      }
    }

    setFilteredGames(filtered);
  };

  const getUniqueGenres = () => {
    if (gamesData !== undefined) {
      const genres = gamesData.map((game) => game.genre);
      return [...new Set(genres)];
    }
    return [];
  };

  const uniqueGenres = getUniqueGenres();

  return (
    <GamesContainer>
      <ContainerLoader>
        <lord-icon
          src="https://cdn.lordicon.com/bbsvenly.json"
          trigger="hover"
          colors="outline:#121331,primary:#2b91ff,secondary:#f10005,tertiary:#646e78"
          style={{ width: '250px', height: '250px' }}
        ></lord-icon>
        <GamesTitle>Lista de Games</GamesTitle>
      </ContainerLoader>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Buscar por título"
          value={searchQuery}
          onChange={handleSearch}
        />
        <GenreSelect value={selectedGenre} onChange={handleGenreSelect}>
          <option value="">Todos os gêneros</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </GenreSelect>
      </SearchContainer>
      {loading || gamesData === undefined || gamesData.length === 0 ? (
        <ContainerLoader>
          <GifLoader src={LoaderGif} alt="Loader" />
          <Loader>Carregando...</Loader>
        </ContainerLoader>
      ) : errormsg ? (
        <ErrorConteiner>
          <ErrorMessage>{errormsg}</ErrorMessage>
          <RefreshButton onClick={handleRefresh}>Atualizar</RefreshButton>
        </ErrorConteiner>
      ) : filteredGames.length === 0 && gamesData.length !== 0 ? (
        <NoResultsMessage>Nenhum resultado encontrado.</NoResultsMessage>
      ) : (
        <GamesGrid>
          {filteredGames.map((game) => (
            <GameCard key={game.id}>
              <GameImage src={game.thumbnail} alt={game.title} />
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.short_description}</GameDescription>
              <GameDetails>
                <GameDetail>Plataforma: {game.platform}</GameDetail>
                <GameDetail>Desenvolvedor: {game.developer}</GameDetail>
                <GameDetail>Publicador: {game.publisher}</GameDetail>
                <GameDetail>Data de Lançamento: {game.release_date}</GameDetail>
              </GameDetails>
              <GameLink href={game.game_url} target="_blank">
                Jogar
              </GameLink>
            </GameCard>
          ))}
        </GamesGrid>
      )}
    </GamesContainer>
  );
}

const GamesContainer = styled.section`
  margin-bottom: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 900px){
  margin-bottom: 250px;
}
`;

const GamesTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: slideInUp 1s;
`;

const ContainerLoader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const GifLoader = styled.img`
  width: 200px;
  height: 200px;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
  width: 200px;
  @media (max-width: 400px){
  width: 140px;
  margin-left: 10px;
}
`;

const GenreSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
  @media (max-width: 400px){
  width: 120px;
  margin-right: 10px;
}
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  animation: rotateIn infinite;
  margin-top: 60px;
`;

const ErrorMessage = styled.div`
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

const NoResultsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  word-break: break-word;
`;

const ErrorConteiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 420px){
    flex-direction: column;
    margin-left: 10px;
}
`;

const GamesGrid = styled.div`
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
`;

const GameCard = styled.div`
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
  :hover {
    box-shadow: 0px 0px 50px 1px rgba(0, 212, 117, 0.3);
  }
`;

const GameImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  &:hover {
  transform: scale(1.01);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }
`;

const RefreshButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease;
  margin-top: 20px;;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const GameTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GameDescription = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const GameDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
`;

const GameDetail = styled.span`
  font-size: 12px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GameLink = styled.a`
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
