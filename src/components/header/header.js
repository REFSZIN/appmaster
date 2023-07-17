/* eslint-disable react-hooks/exhaustive-deps */
import { DefaultSortButton ,SearchInput ,ScrollToTopButton,NavItem,LogoImg,LogoContainer,MenuHamburg,HeaderContainer,LogoutButton,SearchContainer,SortButton,SearchContainerBusca,GenreSelect,Button,BoxBtns,SearchMobile,BtnsMobile,
} from './styled';
import React, { useContext, useEffect } from 'react';
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
  const {gamesData,favorites,showFavorites,sorting,selectedGenre,searchQuery,clearContextData,uniqueGenres,setUniqueGenres,filterGames,anchorEl,showScrollButton,setShowScrollButton,showButton,setShowButton,open, handleToggleSortingMobile, handleToggleShowFavoritesMobile, handleGenreSelectMobile, handleScrollToTop, handleClose, handleClick, defaultSorting, handleToggleDefaultSorting, handleSearch } 
  = useContext(GamesContext);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleShowButton);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      clearContextData();
      navigate('/auth/');
      toast('Usuário desconectado com sucesso.');
    } catch (error) {
      toast.error('Erro ao desconectar o usuário.');
    }
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to="/" onClick={handleScrollToTop} title={showButton ? "Scroll to Top" : "MastersGames"}>
          <LogoImg src="https://www.appmasters.io/favicon.png" alt="Logo" />
        </Link>
      </LogoContainer>
      {showButton && (
        <>
          {userData && (
            <BoxBtns sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <SearchContainer>
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
                onChange={handleGenreSelectMobile}
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
                <Button onClick={handleToggleShowFavoritesMobile} >
                  {showFavorites ? 'Todos' : 'Favoritos'}
                </Button>
                <SortButton onClick={handleToggleSortingMobile }>
                  Ordenar por Avaliação {sorting === 'desc' ? '↓' : '↑'}
                </SortButton>
                <div onClick={handleScrollToTop}>
                  <DefaultSortButton onClick={handleToggleDefaultSorting}>
                    Ordenar por {!defaultSorting ? 'Padrão' : 'Alfabética'}
                  </DefaultSortButton>
                </div>
              </SearchContainer>
            </BoxBtns>
          )}
          <BoxBtns>
            <SearchContainerBusca>
              {!userData?         
                <GenreSelect
                  name="buscaSelect"
                  value={selectedGenre}
                  onChange={handleGenreSelectMobile}
                >
                <option key={''} value="">
                  Todos os gêneros
                </option>
                {uniqueGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </GenreSelect>: <></>}
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
              background: 'white',
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
          {window.innerWidth < 1180 && (
            <MenuItem>
              <SearchMobile>
              <SearchInput
                type="text"
                name="busca"
                placeholder="Buscar por título"
                value={searchQuery}
                onChange={handleSearch}
                onClick={(e) => e.stopPropagation()}
              />
                <GenreSelect
                  name="buscaSelect"
                  value={selectedGenre}
                  onChange={handleGenreSelectMobile}
                  onClick={(e) => e.stopPropagation()}
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
                {userData ? (
                  <>
                    <Button onClick={handleToggleShowFavoritesMobile}>
                      {showFavorites ? 'Todos' : 'Favoritos'}
                    </Button>
                    <SortButton onClick={handleToggleSortingMobile}>
                      Ordenar por Avaliação {sorting === 'asc' ? '↑' : '↓'}
                    </SortButton>
                    <div onClick={handleScrollToTop}>
                      <DefaultSortButton onClick={handleToggleDefaultSorting}>
                        Ordenar por {!defaultSorting ? 'Padrão' : 'Alfabética'}
                      </DefaultSortButton>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </SearchMobile>
            </MenuItem>
          )}
          <MenuItem>
            <BtnsMobile>
              <NavItem>
                {userData ? (
                  <BtnsMobile>
                    <LogoutButton onClick={handleLogout}>
                      <FaUsersSlash />
                      Sair
                    </LogoutButton>
                  </BtnsMobile>
                ) : (
                  <BtnsMobile>
                    <Link to="/auth/">
                      <LogoutButton>
                        <FaUser />
                        Login
                      </LogoutButton>
                    </Link>
                  </BtnsMobile>
                )}
              </NavItem>
            </BtnsMobile>
          </MenuItem>
        </Menu>
      </MenuHamburg>
    </HeaderContainer>
  );
}