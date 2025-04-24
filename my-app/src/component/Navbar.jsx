import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Divider,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <DirectionsBusIcon sx={{ color: '#d32f2f', fontSize: 32, mr: 1 }} />
        <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
          GoRide
        </Typography>
      </Box>
      <Divider />
      <List>
        {['Home', 'My Bookings', 'Offers', 'Help', 'Login/Signup'].map((text) => (
          <ListItem button key={text} sx={{ py: 1.5 }}>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                fontWeight: 'medium',
                textAlign: 'left',
                pl: 2
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'white',
          color: 'text.primary',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          py: 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' }, mr: 1, color: '#d32f2f' }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <DirectionsBusIcon sx={{ color: '#ff6d00', fontSize: 32, mr: 1 }} />
                <Typography variant="h5" sx={{
                  color: '#ff6d00',
                  fontWeight: 'bold',
                  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                  letterSpacing: 1
                }}>
                  GO<span style={{ color: '#1565c0' }}>RIDE</span>
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1
            }}>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: 'rgba(204, 179, 179, 0.1)' }
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: 'rgba(204, 179, 179, 0.1)' }
                }}
              >
                My Bookings
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: 'rgba(204, 179, 179, 0.1)' }
                }}
              >
                Offers
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: 'rgba(204, 179, 179, 0.1)' }
                }}
              >
                Help
              </Button>

              <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24 }} />

              <IconButton sx={{ color: 'inherit' }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Button
                variant="outlined"
                startIcon={<AccountCircleIcon />}
                sx={{
                  ml: 1,
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                  '&:hover': {
                    borderColor: '#b71c1c',
                    backgroundColor: 'rgba(211, 47, 47, 0.04)'
                  }
                }}
              >
                Login / Signup
              </Button>
            </Box>

            {/* Mobile Icons */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <IconButton sx={{ color: '#d32f2f' }}>
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: 'background.paper'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;