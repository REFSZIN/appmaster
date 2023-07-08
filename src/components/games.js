/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import GamesContext from '../contexts/GamesContext';
import { toast } from 'react-toastify';
import LoaderGif from '../assets/loaders/loader.gif';
import useGames from '../hooks/api/useGames';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import UserContext from '../contexts/UserContext';

export default function Games() {
  const { gamesData, errormsg, setGamesData } = useContext(GamesContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const { getGames } = useGames();
  const [ratings, setRatings] = useState({});
  const [sorting, setSorting] = useState('asc');
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const firebaseConfig = {
    apiKey: "AIzaSyCmrOKFfM9TEqNcDmgYfytHrcOGg3lN2uY",
    authDomain: "appmasters-8aa8e.firebaseapp.com",
    projectId: "appmasters-8aa8e",
    storageBucket: "appmasters-8aa8e.appspot.com",
    messagingSenderId: "804104280141",
    appId: "1:804104280141:web:189bbfb7d14391281ca404",
    measurementId: "G-J4WJ5C7Z45"
  };

  useEffect(() => {
    filterGames();
  }, [searchQuery, selectedGenre, gamesData]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      firebase.initializeApp(firebaseConfig);
      const response = await Promise.race([
        getGames(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 5000)
        ),
      ]);
      setGamesData(response);
      setLoading(false);
      filterGames();
      fetchFavorites();
      fetchRatings();
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
        toast.error(
          'O servidor não conseguiu responder por agora, tente voltar novamente mais tarde.'
        );
      }
    } else {
      toast.error(
        'O servidor não conseguiu responder por agora, tente voltar novamente mais tarde.'
      );
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
    
    if (showFavorites) {
      filtered = gamesData.filter((game) => favorites.includes(game.id));
    }

    if (gamesData !== undefined) {
      filtered = gamesData;

      if (searchQuery !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((game) =>
          game.title.toLowerCase().includes(query)
        );
      }

      if (selectedGenre !== '') {
        filtered = filtered.filter((game) => game.genre === selectedGenre);
      }
    }

    setFilteredGames(filtered);
  };
  

  const fetchFavorites = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection('users').doc('OixewtYxzSFIz8SkoKzx');
      const snapshot = await userRef.get();
      if (snapshot.exists) {
        const data = snapshot.data();
        setFavorites(data.favorites || []);
      }
    }
  };

  const fetchRatings = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection('users').doc('OixewtYxzSFIz8SkoKzx');
      const snapshot = await userRef.get();
      if (snapshot.exists) {
        const data = snapshot.data();
        setRatings(data.ratings || {});
      }
    }
  };

  const handleToggleFavorite = async (gameId) => {
    const isFavorite = favorites.includes(gameId);
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== gameId)
      : [...favorites, gameId];
    setFavorites(updatedFavorites);

    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection('users').doc('OixewtYxzSFIz8SkoKzx');
      await userRef.update({ favorites: updatedFavorites });
    }
  };

  const handleToggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleRateGame = async (gameId, rating) => {
    setRatings({ ...ratings, [gameId]: rating });
    if (user) {
      const userRef = firebase.firestore().collection('users').doc('OixewtYxzSFIz8SkoKzx');
      await userRef.update({ [`ratings.${gameId}`]: rating });
    }
  };

  const handleToggleSorting = () => {
    setSorting(sorting === 'asc' ? 'desc' : 'asc');
  };

  const sortedGames = [...filteredGames].sort((a, b) => {
    const ratingA = ratings[a.id] || 0;
    const ratingB = ratings[b.id] || 0;
    if (sorting === 'asc') {
      return ratingA - ratingB;
    } else {
      return ratingB - ratingA;
    }
  });

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
        <Button onClick={handleToggleShowFavorites}>
          {showFavorites ? 'Todos' : 'Favoritos'}
        </Button>
        <SortButton onClick={handleToggleSorting}>
          Ordenar por Avaliação {sorting === 'asc' ? '↑' : '↓'}
        </SortButton>
      </SearchContainer>
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
          {sortedGames.map((game) => (
            <GameCard key={game.id}>
              <GameImage src={game.thumbnail} alt={game.title} />
              <GameTitle>{game.title}              
              <div>
                <RatingContainer>
                <FavoriteIcon
                  onClick={() => {
                    if (user) {
                      handleToggleFavorite(game.id);
                      toast('Game adicionado aos favoritos.');
                    } else {
                      navigate('/auth/');
                      toast.error(
                        'Realize o login para adicionar aos favoritos.'
                      );
                    }
                  }}
                  className={favorites.includes(game.id) ? 'favorite' : ''}
                >
                  ♡
                </FavoriteIcon>
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                      key={index}
                      onClick={() => {
                        if (user) {
                          handleRateGame(game.id, index + 1);
                          toast('Game avaliado.');
                        } else {
                          navigate('/auth/');
                          toast.error('Realize o login para avaliar.');
                        }
                      }}
                      className={index < ratings[game.id] ? 'rated' : ''}
                    >
                      ★
                    </StarIcon>
                  ))}
                </RatingContainer>
              </div></GameTitle>
              <GameDescription>{game.short_description}</GameDescription>
              <GameDetails>
                <GameDetail>Plataforma: {game.platform}</GameDetail>
                <GameDetail>Desenvolvedor: {game.developer}</GameDetail>
                <GameDetail>Publicador: {game.publisher}</GameDetail>
                <GameDetail>
                  Data de Lançamento: {game.release_date}
                </GameDetail>
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

const FavoriteIcon = styled.span`
  font-size: 40px;
  margin-right: 20px;
  cursor: pointer;
  &.favorite {
    color: red;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarIcon = styled.span`
  font-size: 40px;
  cursor: pointer;
  &.rated {
    color: yellow;
  }
`;

const GamesContainer = styled.section`
  margin-bottom: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

  @media (max-width: 468px) {
    width : 300px !important;
  }
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
    @media (max-width: 468px) {
    width : 130px !important;
  }
`;

const GenreSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
    @media (max-width: 468px) {
    width : 150px !important;
  }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
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

  &:hover {
    box-shadow: 0px 0px 50px 1px rgba(0, 212, 117, 0.3);
  }
`;

const GameImage = styled.img`
  max-width: 100%;
  height:auto;
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
  margin-top: 20px;
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

const Button = styled.button`
  margin-right: 20px;
  padding: 8px 12px;
  border-radius: 4px;
`;

const SortButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
`;