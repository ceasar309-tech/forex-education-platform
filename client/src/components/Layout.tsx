import React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, logout } = useAuth();

  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchor(null);
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
  ];

  const userNavItems = user ? [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'My Courses', path: '/courses' },
  ] : [];

  const renderNavItems = () => {
    if (isMobile) {
      return (
        <>
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMenuClose}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => {
                  handleMenuClose();
                  navigate(item.path);
                }}
                selected={location.pathname === item.path}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      );
    }

    return navItems.map((item) => (
      <Button
        key={item.path}
        color="inherit"
        component={RouterLink}
        to={item.path}
        sx={{
          mx: 1,
          color: location.pathname === item.path ? 'secondary.main' : 'inherit',
        }}
      >
        {item.label}
      </Button>
    ));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
            }}
          >
            Forex Education
          </Typography>

          {renderNavItems()}

          {user ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleUserMenuOpen}
                sx={{ ml: 1 }}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleMenuClose}
              >
                {userNavItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => {
                      handleMenuClose();
                      navigate(item.path);
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box>
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
                sx={{ ml: 1 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/register"
                sx={{ ml: 1 }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            {new Date().getFullYear()} Forex Education Platform. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
