/* eslint-disable react-hooks/exhaustive-deps */
import { YTiframe, FavoriteIcon, RatingContainer, StarIcon, GamesContainer, GamesTitle, SearchContainer, DefaultSortButton, ContainerLoader, GifLoader, SearchInput, GenreSelect, Loader, ErrorMessage, NoResultsMessage, ErrorConteiner, GamesGrid, GameCard, GameImage, RefreshButton, GameTitle, GameDescription, GameDetails, GameDetail, GameLink, Button, SortButton, ErrorAviso, SearchContainerBusca, PlayIcon, GameImageContainer, GameImageWrapper, GameImageOverlay }from './styled';
import React, { useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import GamesContext from '../../contexts/GamesContext';
import { toast } from 'react-toastify';
import { FaRegWindowClose } from 'react-icons/fa';
import LoaderGif from '../../assets/loaders/loader.gif';
import a404 from '../../assets/loaders/404.gif';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function Games() {
  const {gamesData,filteredGames,setFilteredGames,favorites,showFavorites,ratings,sorting,setUser,defaultSorting,isFirstRender,setIsFirstRender,selectedGame,setSelectedGame,showVideo,setShowVideo,videoId,setVideoId,imageHeight,setImageHeight,imageRef,errormsg,loading, setLoading,selectedGenre, searchQuery,handleRateGame, filterGames, uniqueGenres, handleCloseVideo, searchYouTubeVideo, fetchData, handleRefresh, handleSearch, handleGenreSelect, handleToggleDefaultSorting, fetchFavorites, fetchRatings, handleToggleFavorite, handleToggleShowFavorites, handleToggleSorting, sortedGames }
  = useContext(GamesContext);
  const { setUserData, userData } = useContext(UserContext);
  
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
    }
  }, [isFirstRender, gamesData]);

  useEffect(() => {
    filterGames();
  }, [searchQuery, selectedGenre, gamesData, showFavorites, favorites]);
  
  useEffect(() => {
    const updateImageHeight = () => {
      if (imageRef.current) {
        setImageHeight(imageRef.current.offsetHeight);
      }
    };
    updateImageHeight();

    window.addEventListener('resize', updateImageHeight);
    return () => {
      window.removeEventListener('resize', updateImageHeight);
    };
  }, [selectedGame, filterGames]);
  
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
        { userData !== null ? (
          <GameTitle>Olá {userData.displayName}, divirta-se!</GameTitle>
        ) : (
          <GameTitle>Olá Visitante! 💖</GameTitle>
        )}
      </ContainerLoader>
      { userData !== null ? (
        <SearchContainer>
          <Button onClick={handleToggleShowFavorites}>
            {showFavorites ? 'Todos' : 'Favoritos'}
          </Button>
          <SortButton onClick={handleToggleSorting}>
            Ordenar por Avaliação {sorting === 'desc' ? '↓' : '↑'}
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