import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../Auth/authSlice';
import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Navbar.css';
import cart_icon from '../Assets/cart_icon.png';
import logo from '../Assets/logo.png';
import maplogo from '../Assets/MapLogo.png';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var isLoggedIn = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem('user',null);
    navigate('/shop');
  };

  const user = useSelector((state) => state.auth.user);

  useEffect(()=>{
    //console.log("dashboard logged in user value"+JSON.stringify(user))
    if(user && user.id){
      //console.log("dashboard logged in user value authenticated"+user.isAuthenticated)
      localStorage.setItem('user',JSON.stringify(user))
    }
  },[user])

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className="navbar" style={{background:' linear-gradient(to left,#01dfed,#7bb8fe)'}}>
        <Toolbar>
          <div className="nav-logo">
            <IconButton edge="start" color="inherit" aria-label="logo">
              <img src={maplogo} alt="logo" />
            </IconButton>
            {/* <b>DigiArtHub</b> */}
          </div>
          <ul className="nav-menu">
            <li onClick={() => setMenu('shop')}>
              {/* <Link style={{ textDecoration: 'none', color: 'inherit',fontWeight:'bold' }} to="/">
                Shop
              </Link> */}
              {menu === 'shop' && <hr />}
            </li>
            <li onClick={() => setMenu('latest')}>
              {/* <Link style={{ textDecoration: 'none', color: 'inherit',fontWeight:'bold' }} to="/latest">
                Latest
              </Link> */}
              {menu === 'latest' && <hr />}
            </li>
            <li onClick={() => setMenu('sale')}>
              {/* <Link style={{ textDecoration: 'none', color: 'inherit',fontWeight:'bold' }} to="/sale">
                SALE
              </Link> */}
              {menu === 'sale' && <hr />}
            </li>
          </ul>
          <div className="nav-login-cart">
            {/* {isLoggedIn && isLoggedIn.id? (
              <>
                <Button color="inherit" onClick={handleLogout} style={{fontWeight:'bold'}}>
                  Logout
                </Button>
                <Button color="inherit" style={{fontWeight:'bold'}} component={Link} to="/profile">
                  Profile
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login" style={{fontWeight:'bold'}}>
                Login
              </Button>
            )} */}
            {/* <IconButton color="inherit" component={Link} to="/cart">
              <img src={cart_icon} color="white" alt="cart" />
            </IconButton> */}
            {/* <div className="nav-cart-count">0</div> */}
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
