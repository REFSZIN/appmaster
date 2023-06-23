import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaDatabase, FaAlignRight,FaArrowUp  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GamesContext from '../contexts/GamesContext';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { statusApi } = useContext(GamesContext);

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
          <Tooltip title="Monitoramento">
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
                width: 32,
                height: 32,
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
              <Link to="/">
                <FaDatabase></FaDatabase>
                StatusApi: {statusApi === true ? <span>ONLINE</span>: <span>OFFLINE</span> }
              </Link>
            </NavItem>
          </MenuItem>
        </Menu>
      </MenuHamburg>
    </HeaderContainer>
  );
}

const LogoContainer = styled.div`
`;

const HeaderContainer = styled.header`
  white-space: wrap;
  background-color: dark;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  background:rgba(0, 0, 0, 0.1);
	-webkit-backdrop-filter: blur(40px);
	backdrop-filter: blur(10px);
  margin-top: -10px;
  z-index: 2;
  mask-border: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 10%, rgb(255, 255, 255) 40%);
  animation: flipInX 1s;
  @media (max-width: 400px){
    padding: 0 20px;
}
`;

const MenuHamburg = styled.div`
`;

const LogoImg = styled.img`
  width: 60px;
  height: 60px;
  @media (max-width: 400px){
  width: 50px;
}
`;

const NavItem = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #555;
  margin: 0 10px;
  cursor: pointer;
  font-family: "Lexend Deca", sans-serif;
  font-family: 'Inter', sans-serif;
  font-family: 'Montserrat', sans-serif;
  font-family: 'Permanent Marker', cursive;
  &:hover {
    color: #fff;
  }
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  top: 90vh;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 60%;
  background-color: #0d71ff;
  color: #fff;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  z-index: 3;
`;