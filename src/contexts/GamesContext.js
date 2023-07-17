/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef,createContext,useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useGames from '../hooks/api/useGames';
import { toast } from 'react-toastify';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const GamesContext = createContext();

export default GamesContext;

export function GamesProvider({ children }) {
  const { getStatus, getGames } = useGames();
  const imageRef = useRef(null);
  const [gamesData, setGamesData] = useLocalStorage('gamesData', []);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [ratings, setRatings] = useState({});
  const [sorting, setSorting] = useState('');
  const [user, setUser] = useState(null);
  const [defaultSorting, setDefaultSorting] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isSortingAlphabetically, setIsSortingAlphabetically] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [imageHeight, setImageHeight] = useState(0);
  const [statusApi, setStatusApi] = useState(null);
  const [errormsg, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const open = Boolean(anchorEl);
  const [paginationEnabled, setPaginationEnabled] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  let [uniqueGenres, setUniqueGenres] = useState([]);

  const clearContextData = () => {
    setLoading(false);
    setSearchQuery('');
    setSelectedGenre('');
    setFilteredGames([]);
    setFavorites([]);
    setShowFavorites(false);
    setRatings([]);
    setSorting('');
    setUser(null);
    setDefaultSorting(false);
    setIsFirstRender(true);
    setIsSortingAlphabetically(false);
    setSelectedGame(null);
    setShowVideo(false);
    setVideoId('');
    setImageHeight(0);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyCmrOKFfM9TEqNcDmgYfytHrcOGg3lN2uY",
    authDomain: "appmasters-8aa8e.firebaseapp.com",
    projectId: "appmasters-8aa8e",
    storageBucket: "appmasters-8aa8e.appspot.com",
    messagingSenderId: "804104280141",
    appId: "1:804104280141:web:189bbfb7d14391281ca404",
    measurementId: "G-J4WJ5C7Z45"
  };

  const getUniqueGenres = () => {
    if (gamesData !== undefined) {
      const genres = gamesData.map((game) => game.genre);
      return [...new Set(genres)];
    }
    return [];
  };

  uniqueGenres = getUniqueGenres();
  const handleCloseVideo = () => {
    setSelectedGame(null);
    setShowVideo(false);
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
      } catch (error) {
        handleError(error);
      }
    };

    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1);
    };

    const handleGenreSelect = (event) => {
      setSelectedGenre(event.target.value);
      setCurrentPage(1);
    };

    const handleToggleDefaultSorting = () => {
      setDefaultSorting(!defaultSorting);
      setCurrentPage(1);
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
        toast.error('Realize o login para adicionar favoritos.');
      }
    };

    const handleToggleShowFavorites = () => {
      setShowFavorites(!showFavorites);
      setSelectedGenre('');
      setSorting('');
      setCurrentPage(1);
      if (!showFavorites) {
        setIsSortingAlphabetically(false);
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
        toast.error('Realize o login para avaliar.');
      }
    };

    useEffect(() => {
      let isCancelled = false;
      let timer;
  
      async function fetchData() {
        try {
          const status = await getStatus();
          if (status?.alive !== false) {
            setStatusApi(status.alive);
            const games = await getGames();
            timer = setTimeout(() => {
              if (isCancelled) {
                setError('O servidor demorou para responder, tente novamente mais tarde.');
              }
            }, 5000);
            clearTimeout(timer);
            if (!isCancelled) {
              setGamesData(games);
            }
          } else {
            setError('O servidor não está respondendo.');
            handleErrorResponse(status?.statusCode);
          }
        } catch (errormsg) {
          setError('O servidor não está respondendo.');
          handleErrorResponse(errormsg?.statusCode);
        }
      }
  
      fetchData();
  
      return () => {
        isCancelled = true;
        clearTimeout(timer);
      };
  
    }, []);
  
    const handleErrorResponse = (statusCode) => {
      if (statusCode && [500, 502, 503, 504, 507, 508, 509].includes(statusCode)) {
        setError('O servidor falhou em responder, tente recarregar a página.');
      } else {
        setError('O servidor não conseguiu responder no momento, tente novamente mais tarde.');
      }
    };

    const filterGames = () => {
      let filtered = [];
      if (showFavorites) {
        setPaginationEnabled(false);
        filtered = gamesData.filter((game) => favorites.includes(game.id));
    
        if (selectedGenre !== '') {
          setPaginationEnabled(false);
          filtered = filtered.filter((game) => game.genre === selectedGenre);
        }
    
        if (searchQuery !== '') {
          setPaginationEnabled(false);
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter((game) =>
            game.title.toLowerCase().includes(query)
          );
        }
      } else {
        if (gamesData !== undefined) {
          filtered = gamesData;
          if (searchQuery !== '') {
            setPaginationEnabled(false);
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((game) =>
              game.title.toLowerCase().includes(query)
            );
          }
          if (selectedGenre !== '') {
            setPaginationEnabled(false);
            filtered = filtered.filter((game) => game.genre === selectedGenre);
          }
        }
      }
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedGames = filtered.slice(startIndex, endIndex);
      
      setFilteredGames(filtered);
      if (isSortingAlphabetically) {
        setSorting('');
        setFilteredGames((prevFilteredGames) => {
          return [...prevFilteredGames].sort((a, b) => a.title.localeCompare(b.title));
        });
      }
      if (paginationEnabled) {
        setFilteredGames(paginatedGames);
      }
    };

    const searchYouTubeVideo = async (title) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
            title + ' Oficial Game Trailer Gameplay'
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
  
    const handleToggleSorting = () => {
      setSorting(sorting === 'desc' ? 'asc' : 'desc');
      setIsSortingAlphabetically(false);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleScrollToTop  = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
  
    const handleGenreSelectMobile = (event) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSelectedGenre(event.target.value);
      setCurrentPage(1);
    };
  
  
    const handleToggleShowFavoritesMobile = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowFavorites(!showFavorites);
      setSelectedGenre('');
      setSorting('');
      setCurrentPage(1);
      if (!showFavorites) {
        setIsSortingAlphabetically(false);
        setDefaultSorting(false);
      }
    };
  
    const handleToggleSortingMobile = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSorting(sorting === 'desc' ? 'asc' : 'desc');
      setIsSortingAlphabetically(false);
    };

    const handlePrevPage = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentPage((prevPage) => prevPage - 1);
      filterGames();
    };
    
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
      filterGames();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handlePaginationToggle = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const startIndex = (currentPage) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedGames = sortedGames.slice(startIndex, endIndex);
      setPaginationEnabled((prevValue) => !prevValue);

      if(paginationEnabled){
        setItemsPerPage(10);
        setCurrentPage(1);
        setFilteredGames(paginatedGames);
        filterGames();
      }

      if(!paginationEnabled){
        setItemsPerPage(10);
        setCurrentPage(1);
        filterGames();
      }
      
    };
    
    const handleItemsPerPageChange = (e) => {
      const { value } = e.target;
      setItemsPerPage(Number(value));
      setCurrentPage(1);
      filterGames();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const gamesContextValues = {
      firebaseConfig,
      gamesData,
      loading,
      searchQuery,
      selectedGenre,
      filteredGames,
      favorites,
      showFavorites,
      filterGames,
      ratings,
      sorting,
      user,
      defaultSorting,
      setLoading,
      isFirstRender,
      isSortingAlphabetically,
      selectedGame,
      showVideo,
      videoId,
      imageHeight,
      uniqueGenres,
      sortedGames,
      setGamesData,
      setSearchQuery,
      setSelectedGenre,
      setFilteredGames,
      setFavorites,
      setShowFavorites,
      setRatings,
      setSorting,
      setUser,
      setDefaultSorting,
      setIsFirstRender,
      setIsSortingAlphabetically,
      setSelectedGame,
      setShowVideo,
      setVideoId,
      setImageHeight,
      handleRefresh,
      handleSearch,
      handleGenreSelect,
      handleToggleDefaultSorting,
      handleToggleFavorite,
      handleToggleShowFavorites,
      handleRateGame,
      handleCloseVideo,
      imageRef,
      clearContextData,
      statusApi,
      errormsg,
      setUniqueGenres, 
      getUniqueGenres, 
      searchYouTubeVideo, 
      handleAPIError, 
      fetchData, 
      handleError,
      fetchFavorites, 
      fetchRatings, 
      handleToggleSorting,
      anchorEl,
      setAnchorEl,
      showScrollButton, 
      setShowScrollButton,
      showButton,
      setShowButton,
      open, handleToggleSortingMobile, handleToggleShowFavoritesMobile, handleGenreSelectMobile, handleScrollToTop, handleClose, handleClick,
      paginationEnabled, setPaginationEnabled, setItemsPerPage, currentPage, setCurrentPage,handlePrevPage,handleNextPage,handlePaginationToggle,handleItemsPerPageChange, itemsPerPage
    };

  return (
  <GamesContext.Provider value={gamesContextValues}>
    {children}
  </GamesContext.Provider>);
};