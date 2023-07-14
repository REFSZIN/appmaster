/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef,createContext } from 'react';
import useGames from '../hooks/api/useGames';
import UserContext from './UserContext';
import { toast } from 'react-toastify';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const GamesContext = createContext();

export default GamesContext;

export function GamesProvider({ children }) {
  const { setUserData } = useContext(UserContext);
  const { getGames } = useGames();
  const imageRef = useRef(null);
  const [gamesData, setGamesData] = useState([]);
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

  const firebaseConfig = {
    apiKey: "AIzaSyCmrOKFfM9TEqNcDmgYfytHrcOGg3lN2uY",
    authDomain: "appmasters-8aa8e.firebaseapp.com",
    projectId: "appmasters-8aa8e",
    storageBucket: "appmasters-8aa8e.appspot.com",
    messagingSenderId: "804104280141",
    appId: "1:804104280141:web:189bbfb7d14391281ca404",
    measurementId: "G-J4WJ5C7Z45"
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
    } else if (sorting === 'desc') {
      sortedGames.sort((a, b) => {
        const ratingA = ratings[a.id] || 0;
        const ratingB = ratings[b.id] || 0;
        return ratingB - ratingA;
      });
    } else {
      sortedGames = [...filteredGames];
    }

    const handleRefresh = async () => {
      setLoading(true);
      try {
        const response = await getGames();
        setGamesData(response);
        setLoading(false);
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

    const gamesContextValues = {
      gamesData,
      loading,
      searchQuery,
      selectedGenre,
      filteredGames,
      favorites,
      showFavorites,
      ratings,
      sorting,
      user,
      defaultSorting,
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
    };

  return (
  <GamesContext.Provider value={gamesContextValues}>
    {children}
  </GamesContext.Provider>);
};