/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { ScrollToTopButton, NavItem, LogoImg, LogoContainer, MenuHamburg, HeaderContainer, LogoutButton, SearchContainer, SortButton, DefaultSortButton,SearchContainerBusca, SearchInput, GenreSelect, Button, BoxBtns, SearchMobile } from './styled';
import React, { useContext, useState, useEffect } from 'react';
import { FaAlignRight, FaArrowUp, FaUser, FaUsersSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import UserContext from '../../contexts/UserContext';
import GamesContext from '../../contexts/GamesContext';
import { toast } from 'react-toastify';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function Header() {
  const { userData, setUserData } = useContext(UserContext);
  const { gamesData } = useContext(GamesContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [defaultSorting, setDefaultSorting] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sorting, setSorting] = useState('');
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isSortingAlphabetically, setIsSortingAlphabetically] = useState(false);
  const [favorites] = useState([]);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUserData(null);
      navigate('/auth/');
      toast('Usuário desconectado com sucesso.');
    } catch (error) {
      toast.error('Erro ao desconectar o usuário.');
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  };

  const handleToggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    setSelectedGenre('');
    setSorting('');
    if (!showFavorites) {
      setIsSortingAlphabetically(false);
    }
  };

  const handleToggleSorting = () => {
    setSorting(sorting === 'asc' ? 'desc' : 'asc');
    setIsSortingAlphabetically(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    const handle = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handle);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handle);
    };
  }, []);

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
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
  };
  
  useEffect(() => {
    const getUniqueGenres = () => {
      if (gamesData !== undefined) {
        const genres = gamesData.map((game) => game.genre);
        return [...new Set(genres)];
      }
      return [];
    };

    setUniqueGenres(getUniqueGenres());
  }, [gamesData]);

  useEffect(() => {
    filterGames();
  }, [searchQuery, selectedGenre, gamesData, showFavorites, favorites]);

  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to="/" onClick={handleScrollToTop} title={ showButton ? "Scroll to Top" : "MastersGames"}>
          <LogoImg src="https://www.appmasters.io/favicon.png" alt="Logo" />
        </Link>
      </LogoContainer>
      {showButton && (
      <>        
      {userData && (
        <BoxBtns sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
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
        </BoxBtns>
      )}
        <BoxBtns>
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
              onChange={handleGenreSelect}>
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
        </BoxBtns>
      </>
      )}
      <MenuHamburg>
        {showScrollButton && (
          <ScrollToTopButton onClick={handleScrollToTop}>
            <FaArrowUp />
          </ScrollToTopButton>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Menu">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 1, mr: 1, color: 'white', size: '100%' }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <FaAlignRight />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            elevation: 0,
            sx: {
              background: 'black',
              overflow: 'visible',
              color: 'white',
              filter: 'drop-shadow(0px 22px 8px #000)',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 54,
                height: 52,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'relative',
                top: 0,
                right: 0,
                width: 1000,
                height: 10,
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        {window.innerWidth < 1180 && showButton && (
          <MenuItem>
            <SearchMobile>
              <GenreSelect
                  name="buscaSelect"
                  value={selectedGenre}
                  onChange={handleGenreSelect}>
                  <option key={''} value="">
                    Todos os gêneros
                  </option>
                  {uniqueGenres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </GenreSelect>
              <SearchInput
                  type="text"
                  name="busca"
                  placeholder="Buscar por título"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              {userData ? <>
                <Button onClick={handleToggleShowFavorites}>
                  {showFavorites ? 'Todos' : 'Favoritos'}
                </Button>
                <SortButton onClick={handleToggleSorting}>
                  Ordenar por Avaliação {sorting === 'asc' ? '↑' : '↓'}
                </SortButton>
                <DefaultSortButton onClick={handleToggleDefaultSorting}>
                  Ordenar por {!defaultSorting ? 'Padrão' : 'Alfabética'}
                </DefaultSortButton>
              </> : <></>}
            </SearchMobile>
          </MenuItem>
        )}
          <MenuItem>
            <NavItem>
              {userData ? (
                <div>
                  <LogoutButton onClick={handleLogout}>
                    <FaUsersSlash />
                    Sair
                  </LogoutButton>
                </div>
              ) : (
                <div>
                  <Link to="/auth/">
                    <LogoutButton>
                      <FaUser />
                      Login
                    </LogoutButton>
                  </Link>
                </div>
              )}
            </NavItem>
          </MenuItem>
        </Menu>
      </MenuHamburg>
    </HeaderContainer>
  );
}