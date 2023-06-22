/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import GamesContext from '../contexts/GamesContext';
import { toast } from 'react-toastify';

export default function Games() {
  
  const { gamesData, error , setGamesData} = useContext(GamesContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    filterGames();
  }, [searchQuery, selectedGenre, gamesData]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (gamesData !== []) {
        setGamesData(gamesData);
        setLoading(false);
      } else {
        handleError();
      }
    } catch (error) {
      handleError();
    }
  };

  const handleError = () => {
    setLoading(false);
    if (error) {
      toast.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreSelect = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filterGames = () => {
    let filtered = gamesData;

    if (searchQuery !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(query)
      );
    }

    if (selectedGenre !== '') {
      filtered = filtered.filter((game) => game.genre === selectedGenre);
    }

    setFilteredGames(filtered);
  };

  const getUniqueGenres = () => {
    const genres = gamesData.map((game) => game.genre);
    return [...new Set(genres)];
  };

  const uniqueGenres = getUniqueGenres();
  

  return (
    <GamesContainer>
      <lord-icon
          src="https://cdn.lordicon.com/bbsvenly.json"
          trigger="hover"
          colors="outline:#121331,primary:#3a3347,secondary:#f24c00,tertiary:#646e78"
          style={{ width: '250px', height: '250px' }}>
      </lord-icon>
      <GamesTitle>Lista de Games</GamesTitle>
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

      {loading ? (
        <Loader>Carregando...</Loader>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : filteredGames.length === 0 ? (
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
  margin-top: 80px;
  margin-bottom: 200px;
  width: 100%;
  @media (max-width: 900px){
  margin-bottom: 350px;
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
  margin-top: 120px;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: red;
  margin-top: 20px;
`;

const NoResultsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

const GamesGrid = styled.div`
  transition: all 1s ease 0s;
  transition: transform 0.3s ease-in-out;
  display: grid;
  grid-template-columns: repeat(3, minmax(420px, 1fr));

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr); /* Dois colunas para telas menores que 1200px */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Uma coluna para telas menores que 768px */
  }
`;

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0000;
  padding: 20px;
  border-radius: 4px;
  animation: fadeInUp 1s ;
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
