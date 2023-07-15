/* eslint-disable react-hooks/exhaustive-deps */
import { YTiframe, FavoriteIcon, RatingContainer, StarIcon, GamesContainer, GamesTitle, SearchContainer, DefaultSortButton, ContainerLoader, GifLoader, SearchInput, GenreSelect, Loader, ErrorMessage, NoResultsMessage, ErrorConteiner, GamesGrid, GameCard, GameImage, RefreshButton, GameTitle, GameDescription, GameDetails, GameDetail, GameLink, Button, SortButton, ErrorAviso, SearchContainerBusca, PlayIcon, GameImageContainer, GameImageWrapper, GameImageOverlay }from './styled';
import React, { useState, useEffect, useContext } from 'react';
import useGames from '../../hooks/api/useGames';
import UserContext from '../../contexts/UserContext';
import GamesContext from '../../contexts/GamesContext';
import { toast } from 'react-toastify';
import { FaRegWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoaderGif from '../../assets/loaders/loader.gif';
import a404 from '../../assets/loaders/404.gif';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function Games() {
  const {gamesData,setGamesData,filteredGames,setFilteredGames,favorites,setFavorites,showFavorites,setShowFavorites,ratings,setRatings,sorting,setSorting,user,setUser,defaultSorting,setDefaultSorting,isFirstRender,setIsFirstRender,selectedGame,setSelectedGame,showVideo,setShowVideo,videoId,setVideoId,imageHeight,setImageHeight,imageRef,errormsg} = useContext(GamesContext);
  const { setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const { getGames } = useGames();
  const navigate = useNavigate();
  const [isSortingAlphabetically, setIsSortingAlphabetically] = useState(true);
  
  const firebaseConfig = {
    apiKey: "AIzaSyCmrOKFfM9TEqNcDmgYfytHrcOGg3lN2uY",
    authDomain: "appmasters-8aa8e.firebaseapp.com",
    projectId: "appmasters-8aa8e",
    storageBucket: "appmasters-8aa8e.appspot.com",
    messagingSenderId: "804104280141",
    appId: "1:804104280141:web:189bbfb7d14391281ca404",
    measurementId: "G-J4WJ5C7Z45"
  };

  const searchYouTubeVideo = async (title) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
          title + ' Oficial Game Trailer Gameplay '
        )}&part=snippet&maxResults=1&key=AIzaSyDTDvecZqYzHKjU2NNnuV3EXIqA0V_6UWU`
      );
      if (response.ok) {
        const data = await response.json();
        const videoId = data.items[0].id.videoId;
        return videoId;
      } else {
        handleCloseVideo();
        const errorData = await response.json();
        const errorMessage = errorData.error.message;
        handleAPIError(response.status, errorMessage);
      }
    } catch (error) {
      console.error('Erro ao buscar vídeo no YouTube:', error);
      toast.error('Ocorreu um erro ao buscar o vídeo no YouTube. Por favor, tente novamente mais tarde.');
    }
  };
  
  const handleAPIError = (statusCode, errorMessage) => {
    switch (statusCode) {
      case 400:
        toast.error('Solicitação inválida. Verifique os parâmetros da sua solicitação.');
        break;
      case 401:
        toast.error('Não autorizado. Verifique se você possui as permissões corretas.');
        break;
      case 403:
        toast.error('Excedemos a cota diaria API Data do YouTube.');
        break;
      case 404:
        toast.error('Recurso não encontrado. Verifique se o vídeo existe e está disponível.');
        break;
      case 500:
        toast.error('Erro interno do servidor. Por favor, tente novamente mais tarde.');
        break;
      default:
        toast.error(`Ocorreu um erro (${statusCode}): ${errorMessage}`);
        break;
    }
  };

  const fetchData = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    try {
      firebase.initializeApp(firebaseConfig);
      const response = await Promise.race([
        getGames(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
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
    setDefaultSorting(!defaultSorting);
    setIsSortingAlphabetically(true);
    setFilteredGames((prevFilteredGames) => {
      if (defaultSorting) {
        setSorting('');
        return [...prevFilteredGames].sort((a, b) => a.title.localeCompare(b.title));
      } else {
        setSorting('');
        if (showFavorites) {
          const sortedFavorites = favorites
            .map((favoriteId) => prevFilteredGames.find((game) => game.id === favoriteId))
            .filter((game) => game !== undefined);
          return sortedFavorites;
        }
        return [...gamesData];
      }
    });
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

    if (isSortingAlphabetically) {
      setSorting('');
      setFilteredGames((prevFilteredGames) => {
        return [...prevFilteredGames].sort((a, b) => a.title.localeCompare(b.title));
      });
    }
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
        setFilteredGames((prevFilteredGames) => {
          const updatedGames = prevFilteredGames.map((game) => {
            if (game.id === gameId) {
              return { ...game, isFavorite: !isFavorite };
            }
            return game;
          });
          return [...updatedGames];
        });
        if (isFavorite) {
          toast.info('Game removido dos favoritos.');
        } else {
          toast.success('Game adicionado aos favoritos.');
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
    setSorting('');
    if (!showFavorites) {
      setIsSortingAlphabetically(false);
      setDefaultSorting(true);
    }
  };

  const handleRateGame = async (gameId, rating) => {
    const user = firebase.auth().currentUser;

    if (user) {
      const userRef = firebase.firestore().collection('users').doc('OixewtYxzSFIz8SkoKzx');
      const userSnapshot = await userRef.get();

      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        const previousRating = userData.ratings && userData.ratings[gameId];

        let updatedRatings;
        if (previousRating === rating) {
          delete userData.ratings[gameId];
          updatedRatings = { ...userData.ratings };
          toast.info('Avaliação retirada.');
        } else {
          updatedRatings = { ...userData.ratings, [gameId]: rating };
          toast.success('Game avaliado.');
        }

        await userRef.update({ ratings: updatedRatings });
        setRatings(updatedRatings);
      }
    } else {
      navigate('/auth/');
      toast.error('Realize o login para avaliar.');
    }
  };

  const handleToggleSorting = () => {
    setSorting(sorting === 'asc' ? 'desc' : 'asc');
    setIsSortingAlphabetically(false);
  };

  const getUniqueGenres = () => {
    if (gamesData !== undefined) {
      const genres = gamesData.map((game) => game.genre);
      return [...new Set(genres)];
    }
    return [];
  };

  const handleCloseVideo = () => {
    setSelectedGame(null);
    setShowVideo(false);
  };

  const uniqueGenres = getUniqueGenres();
  let sortedGames = [...filteredGames];

  if (sorting === 'asc') {
    sortedGames.sort((a, b) => {
      const ratingA = ratings[a.id] || 0;
      const ratingB = ratings[b.id] || 0;
      return ratingA - ratingB;
    });
  } 
  else if (sorting === 'desc') {
    sortedGames.sort((a, b) => {
      const ratingA = ratings[a.id] || 0;
      const ratingB = ratings[b.id] || 0;
      return ratingB - ratingA;
    });
  } else {
    sortedGames = [...filteredGames];
  }
  useEffect(() => {
    filterGames();
  }, [searchQuery, selectedGenre, gamesData, showFavorites, favorites]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchFavorites();
    fetchRatings();
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setUserData(user);
      if (user) {
        toast(`Bem-vindo 😍, ${user.displayName}!`);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchFavorites();
    fetchRatings();
    if (isFirstRender) {
      setFilteredGames(gamesData);
      setIsFirstRender(false);
      fetchData();
    }
  }, [isFirstRender, gamesData]);

  useEffect(() => {
    const fetchYouTubeVideo = async () => {
      if (selectedGame) {
        const game = gamesData.find((game) => game.id === selectedGame);
        if (game) {
          const videoId = await searchYouTubeVideo(game.title);
          setVideoId(videoId);
          setShowVideo(true);
        }
      } else {
        setShowVideo(false);
      }
    };

    fetchYouTubeVideo();
  }, [selectedGame]);

  useEffect(() => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.offsetHeight);
    }
  }, [selectedGame, filterGames]);

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
          <GameTitle>Olá {user.displayName}, divirta-se!</GameTitle>
        ) : (
          <GameTitle>Olá Visitante! 💖</GameTitle>
        )}
      </ContainerLoader>
      {user ? (
        <SearchContainer>
          <Button onClick={handleToggleShowFavorites}>
            {showFavorites ? 'Todos' : 'Favoritos'}
          </Button>
          <SortButton onClick={handleToggleSorting}>
            Ordenar por Avaliação {sorting === 'asc' ? '↑' : '↓'}
          </SortButton>
          <DefaultSortButton onClick={handleToggleDefaultSorting}>
            Ordenar por {!defaultSorting ? 'Padrão' : 'Alfabética'}
          </DefaultSortButton>
        </SearchContainer>
      ) : (
        <></>
      )}
      <SearchContainerBusca>
        <SearchInput
          type="text"
          name="busca"
          placeholder="Buscar por título"
          value={searchQuery}
          onChange={handleSearch}
        />
        <GenreSelect
          name="buscaSelect"
          value={selectedGenre}
          onChange={handleGenreSelect}
        >
          <option key={''} value="">
            Todos os gêneros
          </option>
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
            {selectedGame === game.id && showVideo ? (
              <></>
            ) : (
              <GameImageContainer onClick={() => setSelectedGame(game.id)}>
                <GameImageWrapper>
                  <GameImage
                    ref={imageRef}
                    src={game.thumbnail}
                    alt={game.title}
                  />
                  <GameImageOverlay></GameImageOverlay>
                  <PlayIcon  title="Abrir Video"/>
                </GameImageWrapper>
              </GameImageContainer>
            )}
              {selectedGame === game.id && showVideo && (
                <GameImageContainer>
                  <YTiframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube Game Video"
                    width="100%"
                    height={imageHeight}
                    allowFullScreen
                  ></YTiframe>
                  <FaRegWindowClose cursor="pointer" onClick={() => handleCloseVideo()} />
                </GameImageContainer>
              )}
              <GameTitle>
                {game.title} - {game.genre}
                <div>
                  <RatingContainer>
                    <FavoriteIcon
                      onClick={() => handleToggleFavorite(game.id)}
                      className={favorites.includes(game.id) ? 'favorite' : ''}
                      title={favorites.includes(game.id) ? 'Desfavoritar' : 'Favoritar'}
                    >
                      ♡
                    </FavoriteIcon>
                    {Array.from({ length: 5 }, (_, index) => (
                      <StarIcon
                        key={index}
                        onClick={() => handleRateGame(game.id, index + 1)}
                        className={index < ratings[game.id] ? 'rated' : ''}
                        title={index === ratings[game.id] - 1 ? 'Retirar avaliação' : `Avaliar com ${index + 1} estrelas`}
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
                <br/>
              <GameLink href={game.game_url} target="_blank" glowOnHover={true}>
                Jogar
              </GameLink>
            </GameCard>
          ))}
        </GamesGrid>
      )}
    </GamesContainer>
  );
}