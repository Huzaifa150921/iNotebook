import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme, Slide, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CustomAlert from './CustomAlert';

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [alert, setAlert] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setAlert({ message: "Logging out...", type: "info" });
    setTimeout(() => {
      localStorage.removeItem('token');
      window.location.reload();
    }, 3000); // Delay logout by 3 seconds
  };

  return (
    <>
      {alert && (
        <CustomAlert 
          open={Boolean(alert)}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <HideOnScroll>
        <AppBar
          position="static"
          sx={{
            background: 'linear-gradient(135deg, #000000, #434343)', // Black gradient background
            transition: 'background-color 0.3s ease', // Smooth transition for background color change
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)', // Dark shadow for depth
            '&:hover': {
              background: 'linear-gradient(135deg, #1a1a1a, #333333)', // Darker gradient on hover
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                iNoteBook
              </Link>
            </Typography>
            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/"
                    onClick={handleMenuClose}
                    sx={{
                      color: isActive("/") ? "secondary.main" : "inherit",
                      backgroundColor: isActive("/") ? "rgba(255, 255, 255, 0.1)" : "inherit",
                      transition: 'color 0.3s ease, background-color 0.3s ease'
                    }}
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/about"
                    onClick={handleMenuClose}
                    sx={{
                      color: isActive("/about") ? "secondary.main" : "inherit",
                      backgroundColor: isActive("/about") ? "rgba(255, 255, 255, 0.1)" : "inherit",
                      transition: 'color 0.3s ease, background-color 0.3s ease'
                    }}
                  >
                    About
                  </MenuItem>
                  {!localStorage.getItem('token') ? (
                    <>
                      <MenuItem
                        component={Link}
                        to="/login"
                        onClick={handleMenuClose}
                        sx={{
                          color: isActive("/login") ? "secondary.main" : "inherit",
                          backgroundColor: isActive("/login") ? "rgba(255, 255, 255, 0.1)" : "inherit",
                          transition: 'color 0.3s ease, background-color 0.3s ease'
                        }}
                      >
                        Login
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/signup"
                        onClick={handleMenuClose}
                        sx={{
                          color: isActive("/signup") ? "secondary.main" : "inherit",
                          backgroundColor: isActive("/signup") ? "rgba(255, 255, 255, 0.1)" : "inherit",
                          transition: 'color 0.3s ease, background-color 0.3s ease'
                        }}
                      >
                        Signup
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        color: 'secondary.main',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transition: 'color 0.3s ease, background-color 0.3s ease'
                      }}
                    >
                      Logout
                    </MenuItem>
                  )}
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/"
                  sx={{
                    color: isActive("/") ? 'secondary.main' : 'white',
                    borderBottom: isActive("/") ? '2px solid secondary.main' : 'none',
                    backgroundColor: isActive("/") ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    transition: 'color 0.3s ease, border-bottom 0.3s ease, background-color 0.3s ease',
                    marginLeft: 2,
                    '&:hover': {
                      borderBottom: isActive("/") ? '2px solid secondary.main' : 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/about"
                  sx={{
                    color: isActive("/about") ? 'secondary.main' : 'white',
                    borderBottom: isActive("/about") ? '2px solid secondary.main' : 'none',
                    backgroundColor: isActive("/about") ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    transition: 'color 0.3s ease, border-bottom 0.3s ease, background-color 0.3s ease',
                    marginLeft: 2,
                    '&:hover': {
                      borderBottom: isActive("/about") ? '2px solid secondary.main' : 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  About
                </Button>
                {!localStorage.getItem('token') ? (
                  <>
                    <Button
                      component={Link}
                      to="/login"
                      variant="contained"
                      color="secondary"
                      sx={{ marginLeft: 2 }}
                    >
                      Login
                    </Button>
                    <Button
                      component={Link}
                      to="/signup"
                      variant="contained"
                      color="secondary"
                      sx={{ marginLeft: 2 }}
                    >
                      Signup
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="secondary"
                    sx={{ marginLeft: 2 }}
                  >
                    Logout
                  </Button>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Navbar;
