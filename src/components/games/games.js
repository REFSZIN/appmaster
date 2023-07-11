/* eslint-disable react-hooks/exhaustive-deps */
import { FavoriteIcon, RatingContainer, StarIcon, GamesContainer, GamesTitle, SearchContainer, DefaultSortButton, ContainerLoader, GifLoader, SearchInput, GenreSelect, Loader, ErrorMessage, NoResultsMessage, ErrorConteiner, GamesGrid, GameCard, GameImage, RefreshButton,GameTitle, GameDescription, GameDetails, GameDetail, GameLink, Button, SortButton, ErrorAviso, SearchContainerBusca } from './styled';
import React, { useState, useEffect, useContext } from 'react';
import GamesContext from '../../contexts/GamesContext';
import { toast } from 'react-toastify';
import LoaderGif from '../../assets/loaders/loader.gif';
import useGames from '../../hooks/api/useGames';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import a404 from '../../assets/loaders/404.gif';

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
  const [sorting, setSorting] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [defaultSorting, setDefaultSorting] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

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
  }, [searchQuery, selectedGenre, gamesData, showFavorites, favorites]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        toast(`Bem-vindo 😍, ${user.displayName} !`);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      sortedGames = [...gamesData];
      setIsFirstRender(false);
    }
  }, [isFirstRender, filteredGames]);

  const fetchData = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      toast.error('O servidor demorou para responder, mas resolvemos por aqui 🍷🗿.');
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

  const handleToggleDefaultSorting = () => {
    setSorting(defaultSorting ? '' : 'asc');
    setDefaultSorting(true);
  };

  const filterGames = () => {
    let filtered = [];

    if (showFavorites) {
      filtered = gamesData.filter((game) => favorites.includes(game.id));

      if (selectedGenre !== '') {
        filtered = filtered.filter((game) => game.genre === selectedGenre);
      }

      if (searchQuery !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((game) =>
          game.title.toLowerCase().includes(query)
        );
      }
    } else {
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
    const user = firebase.auth().currentUser;
    if (user) {
      try {
        const userRef = firebase.firestore().collection('users').doc('OixewtYxzSFIz8SkoKzx');
        await userRef.update({ favorites: updatedFavorites });
        setFavorites(updatedFavorites);
        if (isFavorite) {
          toast.info('Jogo removido dos favoritos.');
        } else {
          toast.success('Jogo adicionado aos favoritos.');
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao atualizar os favoritos.');
      }
    } else {
      navigate('/auth/');
      toast.error('Realize o login para adicionar favoritos.');
    }
  };

  const handleToggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    setSelectedGenre('');
  };

  const handleRateGame = async (gameId, rating) => {
    setRatings({ ...ratings, [gameId]: rating });
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection('users').doc('OixewtYxzSFIz8SkoKzx');
      await userRef.update({ [`ratings.${gameId}`]: rating });
      toast.success('Jogo avaliado.');
    } else {
      navigate('/auth/');
      toast.error('Realize o login para avaliar.');
    }
  };

  const handleToggleSorting = () => {
    setSorting(sorting === 'asc' ? 'desc' : 'asc');
  };

  let sortedGames = [...filteredGames];

  if (sorting === 'asc') {
    sortedGames.sort((a, b) => {
      const ratingA = ratings[a.id] || 0;
      const ratingB = ratings[b.id] || 0;
      return ratingA - ratingB;
    });
  } else if (sorting === 'desc') {
    sortedGames.sort((a, b) => {
      const ratingA = ratings[a.id] || 0;
      const ratingB = ratings[b.id] || 0;
      return ratingB - ratingA;
    });
  } else {
    sortedGames = [...filteredGames];
  }

  const getUniqueGenres = () => {
    if (gamesData !== undefined) {
      const genres= gamesData.map((game) => game.genre);
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
          alt="Joystick"
          trigger="hover"
          colors="outline:#121331,primary:#2b91ff,secondary:#f10005,tertiary:#646e78"
          style={{ width: '250px', height: '250px' }}
        ></lord-icon>
        <GamesTitle>Master👾Games</GamesTitle>
        {user ? (
          <GameTitle>Olá novamente {user.displayName}, divirta-se!</GameTitle>
        ) : (
          <GameTitle>Olá Visitante! 💖</GameTitle>
        )}
      </ContainerLoader>
      {user ?      
      <SearchContainer>
        <Button onClick={handleToggleShowFavorites}>
          {showFavorites ? 'Todos' : 'Favoritos'}
        </Button>
        <SortButton onClick={handleToggleSorting}>
          Ordenar por Avaliação {sorting === 'asc' ? '↑' : '↓'}
        </SortButton>
        <DefaultSortButton onClick={handleToggleDefaultSorting}>
          Ordenar por Padrão
        </DefaultSortButton>
      </SearchContainer> : <></>}
      <SearchContainerBusca>
        <SearchInput
          type="text"
          name="busca"
          placeholder="Buscar por título"
          value={searchQuery}
          onChange={handleSearch}
        />
        <GenreSelect name="buscaSelect" value={selectedGenre} onChange={handleGenreSelect}>
          <option key={''} value="">Todos os gêneros</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </GenreSelect>
      </SearchContainerBusca>
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
        <ErrorAviso>
          <GifLoader src={a404} alt="Loader" />
          <NoResultsMessage>Nenhum resultado encontrado.</NoResultsMessage>
        </ErrorAviso>
      ) : (
        <GamesGrid>
          {sortedGames.map((game) => (
            <GameCard key={game.id}>
              <GameImage src={game.thumbnail} alt={game.title} />
              <GameTitle>
                {game.title}  -  {game.genre}
                <div>
                  <RatingContainer>
                    <FavoriteIcon
                      onClick={() => handleToggleFavorite(game.id)}
                      className={favorites.includes(game.id) ? 'favorite' : ''}
                    >
                      ♡
                    </FavoriteIcon>
                    {Array.from({ length: 5 }, (_, index) => (
                      <StarIcon
                        key={index}
                        onClick={() => handleRateGame(game.id, index + 1)}
                        className={index < ratings[game.id] ? 'rated' : ''}
                      >
                        ★
                      </StarIcon>
                    ))}
                  </RatingContainer>
                </div>
              </GameTitle>
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