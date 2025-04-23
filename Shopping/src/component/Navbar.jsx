import React, { useState, useContext } from "react";
import { Badge, AppBar, Toolbar, Typography, Box, BottomNavigation, BottomNavigationAction, Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { Search, Close, Home, Category, AccountCircle, Favorite, ShoppingCart ,ShoppingBag} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CardContext"; 

const Navbar = () => {
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      navigate(`/collection?search=${term.trim()}`);
    }
    else {
      navigate("/collection");
    }
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={1}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1 
        }}
      >
        <Toolbar sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "nowrap",
          padding: isMobile ? "8px" : "8px"
        }}>
          {/* Brand Name */}
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 900, 
              flex: isMobile && !showSearch ? 0.5 : 0.5, 
              color: "#D81B60", 
              letterSpacing: "2px",
              fontFamily: "Dancing Script",
              fontStyle: "normal",
              fontSize: isMobile ? "1rem" : "1.5rem"
            }}
          >
            Elite Spark
          </Typography>

          {/* Navigation Links as Buttons */}
          {!isMobile && (
            <Box sx={{ 
              display: "flex", 
              gap: 0.5, 
              flexGrow: 0.2, 
              justifyContent: "center" 
            }}>
              <Button variant="text" component={Link} to="/" sx={{ color: "#D81B60" }}>Home</Button>
              <Button variant="text" component={Link} to="/collection" sx={{ color: "#D81B60" }}>Collection</Button>
              <Button variant="text" component={Link} to="/newarrivals" sx={{ color: "#D81B60" }}>New Arrivals</Button>
              <Button variant="text" component={Link} to="/offers" sx={{ color: "#D81B60" }}>Offers</Button>
            </Box>
          )}

          {/* Search Input */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 2, 
            flex: isMobile && showSearch ? 1 : 'none', 
            justifyContent: "flex-end",
            width: isMobile && showSearch ? '100%' : 'auto',
            marginLeft: isMobile && !showSearch ? 'auto' : 0
          }}>
            {!isMobile || showSearch ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange} 
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  width: isMobile ? "100%" : "200px",
                  '& .MuiOutlinedInput-root': {
                    paddingRight: isMobile ? 1 : 0
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: isMobile ? (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={() => {
                          setShowSearch(false);
                          setSearchTerm("");
                        }}
                        size="small"
                      >
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
                autoFocus={isMobile && showSearch}
              />
            ) : (
              <IconButton 
                onClick={() => setShowSearch(true)} 
                sx={{ color: '#D81B60' }}
              >
                <Search />
              </IconButton>
            )}
            {!isMobile && (
              <>
                <IconButton component={Link} to="/wishlist" sx={{color:' #D81B60'}}>
                  <Favorite />
                </IconButton>
                <IconButton component={Link} to="/cart" sx={{color:' #D81B60'}}>
                  <Badge badgeContent={cart?.length || 0} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton component={Link} to="/orders" sx={{color:' #D81B60'}}>
                <ShoppingBag />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Bottom Navigation for Mobile */}
      {isMobile && (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{ 
            position: "fixed", 
            bottom: 0, 
            left: 0, 
            right: 0,
            backgroundColor: "rgba(255, 255, 255, 0.95)", 
            boxShadow: 3,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            height: '56px'
          }}
        >
           <BottomNavigationAction
          icon={<ShoppingBag />} 
            component={Link} 
            to="/orders" 
            sx={{ 
              color: "#D81B60",
              minWidth: 'auto',
              padding: '6px 12px'
            }} 
          />
          <BottomNavigationAction 
            icon={<Category />} 
            component={Link} 
            to="/collection" 
            sx={{ 
              color: "#D81B60",
              minWidth: 'auto',
              padding: '6px 12px'
            }} 
          />
         
          <BottomNavigationAction 
            icon={<Home />} 
            component={Link} 
            to="/" 
            sx={{ 
              color: "#D81B60",
              minWidth: 'auto',
              padding: '6px 12px'
            }} 
          />
          <BottomNavigationAction 
            icon={<Favorite />} 
            component={Link} 
            to="/wishlist" 
            sx={{ 
              color: "#D81B60",
              minWidth: 'auto',
              padding: '6px 12px'
            }} 
          />
          <BottomNavigationAction 
            icon={
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCart />
              </Badge>
            } 
            component={Link} 
            to="/cart" 
            sx={{ 
              color: "#D81B60",
              minWidth: 'auto',
              padding: '6px 12px'
            }} 
          />
         
        </BottomNavigation>
        
      )}
    
      
      {/* Add spacer to prevent content from being hidden behind the app bar */}
      <Toolbar sx={{ minHeight: isMobile ? '56px' : '64px' }} />
      {isMobile && <Box sx={{ pb: 7 }} />}
    </>
  );
};

export default Navbar;