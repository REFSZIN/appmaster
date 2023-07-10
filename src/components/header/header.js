import { ScrollToTopButton, NavItem, LogoImg, LogoContainer, MenuHamburg, HeaderContainer, LogoutButton } from './styled';
import React, { useContext, useState, useEffect } from 'react';
import { FaAlignRight,FaArrowUp, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function Header() {
  const { userData , setUserData } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to="/">
          <LogoImg src="https://www.appmasters.io/favicon.png" alt="Logo" />
        </Link>
      </LogoContainer>
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
              <FaAlignRight></FaAlignRight>
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
              filter: 'drop-shadow(0px 2px 8px #000)',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 42,
                height: 42,
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
          <MenuItem onClick={handleClose}>
          <NavItem>
            {userData? (
              <div>
                <LogoutButton onClick={handleLogout}>
                  Sair
                </LogoutButton>
              </div>
            ) : (
              <div>
              <Link to="/auth/">
                <FaUser></FaUser>
                Login
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