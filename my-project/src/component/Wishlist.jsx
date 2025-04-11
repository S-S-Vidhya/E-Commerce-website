// import React, { useContext } from "react";
// import { 
//   Box, 
//   Typography, 
//   Button, 
//   IconButton, 
//   Grid, 
//   Rating, 
//   Chip 
// } from "@mui/material";
// import { Favorite } from "@mui/icons-material";
// import { WishlistContext } from "./WishlistContext";
// import { CartContext } from "./CardContext";
// import { Link } from "react-router-dom";

// const Wishlist = () => {
//   const { wishlist, removeFromWishlist } = useContext(WishlistContext);
//   const { addToCart } = useContext(CartContext);

//   const getDiscountedPrice = (price, discount) => {
//     return (price - (price * discount / 100)).toFixed(2);
//   };

//   return (
//     <Box p={3} mt={2}>
//       <Typography 
//         variant="h4" 
//         mb={5} 
//         sx={{ 
//           color: "#D81B60",
//           textAlign: 'center',
//           fontFamily: 'serif',
//           fontWeight: 'bold'
//         }}
//       >
//         Your Wishlist
//       </Typography>

//       {wishlist.length === 0 ? (
//         <Typography color="textSecondary" textAlign='center'>
//           Your wishlist is empty. You can 
//           <Button 
//             component={Link} 
//             to="/collection" 
//             sx={{ 
//               color: "#D81B60",
//               fontSize: "inherit",
//               textTransform: 'none',
//               '&:hover': {
//                 textDecoration: 'underline',
//                 backgroundColor: 'transparent'
//               }
//             }}
//           >
//             Continue Shopping
//           </Button> 
//           or explore our latest collection.
//         </Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {wishlist.map((product) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//               <Box
//                 border="1px solid #ddd"
//                 borderRadius={2}
//                 p={2}
//                 textAlign="center"
//                 sx={{
//                   position: "relative",
//                   transition: "0.3s",
//                   "&:hover": { boxShadow: 3, transform: "scale(1.02)" },
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   width:'80%'
//                 }}
//               >
//                 {/* Discount Badge */}
//                 {product.Discount > 0 && (
//                   <Chip 
//                     label={`${product.Discount}% OFF`}
//                     size="small"
//                     sx={{
//                       position: 'absolute',
//                       top: 18,
//                       left: 18,
//                       fontWeight: 'bold',
//                       backgroundColor: '#D81B60',
//                       color: 'white',
//                       zIndex: 1
//                     }}
//                   />
//                 )}

//                 {/* Product Image */}
//                 <Box position="relative" sx={{ flexGrow: 1 }}>
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     style={{
//                       width: "100%",
//                       height: "200px",
//                       objectFit: "cover",
//                       borderRadius: "8px",
//                     }}
//                   />

//                   {/* Wishlist Button */}
//                   <IconButton
//                     onClick={() => removeFromWishlist(product.id)}
//                     sx={{
//                       position: "absolute",
//                       bottom: 10,
//                       right: 10,
//                       backgroundColor: "rgba(255, 255, 255, 0.7)",
//                       '&:hover': { 
//                         backgroundColor: "rgba(255, 255, 255, 0.9)" 
//                       },
//                     }}
//                   >
//                     <Favorite color="error" />
//                   </IconButton>
//                 </Box>

//                 {/* Product Name */}
//                 <Typography 
//                   mt={1} 
//                   fontWeight="bold"
//                   sx={{ minHeight: '50px' }}
//                 >
//                   {product.name}
//                 </Typography>

//                 {/* Material */}
//                 <Typography variant="caption" color="text.secondary">
//                   {product.material}
//                 </Typography>

//                 {/* Rating */}
//                 <Box my={1}>
//                   <Rating 
//                     value={parseFloat(product.ratings) || 0} 
//                     precision={0.5} 
//                     readOnly 
//                   />
//                 </Box>

//                 {/* Price Section */}
//                 <Box sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: 'center',
//                   gap: 1,
//                   flexWrap: 'wrap',
//                   minHeight: '30px'
//                 }}>
//                   {product.Discount > 0 ? (
//                     <>
//                       <Typography 
//                         variant="body1" 
//                         sx={{ 
//                           color: 'text.secondary',
//                           textDecoration: 'line-through'
//                         }}
//                       >
//                         ${product.price}
//                       </Typography>
//                       <Typography 
//                         variant="body1" 
//                         sx={{ 
//                           color: '#D81B60', 
//                           fontWeight: 'bold'
//                         }}
//                       >
//                         ${getDiscountedPrice(product.price, product.Discount)}
//                       </Typography>
//                     </>
//                   ) : (
//                     <Typography variant="body1" color="text.secondary">
//                       ${product.price}
//                     </Typography>
//                   )}
//                 </Box>

//                 {/* Add to Cart Button */}
//                 <Box mt={2}>
//                   <Button
//                     variant="contained"
//                     onClick={() => addToCart(product)}
//                     fullWidth
//                     sx={{ 
//                       backgroundColor: "#D81B60",
//                       '&:hover': {
//                         backgroundColor: '#C2185B'
//                       }
//                     }}
//                   >
//                     Add to Cart
//                   </Button>
//                 </Box>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default Wishlist;



import React, { useContext, useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Grid, 
  Rating, 
  Chip,
  Snackbar,
  Alert
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { WishlistContext } from "./WishlistContext";
import { CartContext } from "./CardContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [removedProductName, setRemovedProductName] = useState("");

  const getDiscountedPrice = (price, discount) => {
    return (price - (price * discount / 100)).toFixed(2);
  };

  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product.id);
    setRemovedProductName(product.name);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box p={3} mt={2}>
      <Typography 
        variant="h4" 
        mb={5} 
        sx={{ 
          color: "#D81B60",
          textAlign: 'center',
          fontFamily: 'serif',
          fontWeight: 'bold'
        }}
      >
        Your Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Typography color="textSecondary" textAlign='center'>
          Your wishlist is empty. You can 
          <Button 
            component={Link} 
            to="/collection" 
            sx={{ 
              color: "#D81B60",
              fontSize: "inherit",
              textTransform: 'uppercase',
              '&:hover': {
                textDecoration: 'underline',
                backgroundColor: 'transparent'
              }
            }}
          >
            Continue Shopping
          </Button> 
          or explore our latest collection.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {wishlist.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Box
                border="1px solid #ddd"
                borderRadius={2}
                p={2}
                textAlign="center"
                sx={{
                  position: "relative",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 3, transform: "scale(1.02)" },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Discount Badge */}
                {product.Discount > 0 && (
                  <Chip 
                    label={`${product.Discount}% OFF`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      fontWeight: 'bold',
                      backgroundColor: '#D81B60',
                      color: 'white',
                      zIndex: 1
                    }}
                  />
                )}

                {/* Product Image */}
                <Box position="relative" sx={{ flexGrow: 1 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  {/* Wishlist Button */}
                  <IconButton
                    onClick={() => handleRemoveFromWishlist(product)}
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      '&:hover': { 
                        backgroundColor: "rgba(255, 255, 255, 0.9)" 
                      },
                    }}
                  >
                    <Favorite color="error" />
                  </IconButton>
                </Box>

                {/* Product Name */}
                <Typography 
                  mt={1} 
                  fontWeight="bold"
                  sx={{ minHeight: '50px' }}
                >
                  {product.name}
                </Typography>

                {/* Material */}
                <Typography variant="caption" color="text.secondary">
                  {product.material}
                </Typography>

                {/* Rating */}
                <Box my={1}>
                  <Rating 
                    value={parseFloat(product.ratings) || 0} 
                    precision={0.5} 
                    readOnly 
                  />
                </Box>

                {/* Price Section */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 1,
                  flexWrap: 'wrap',
                  minHeight: '30px'
                }}>
                  {product.Discount > 0 ? (
                    <>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'text.secondary',
                          textDecoration: 'line-through'
                        }}
                      >
                        ${product.price}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#D81B60', 
                          fontWeight: 'bold'
                        }}
                      >
                        ${getDiscountedPrice(product.price, product.Discount)}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      ${product.price}
                    </Typography>
                  )}
                </Box>

                {/* Add to Cart Button */}
                <Box mt={2}>
                  <Button
                    variant="contained"
                    onClick={() => addToCart(product)}
                    fullWidth
                    sx={{ 
                      backgroundColor: "#D81B60",
                      '&:hover': {
                        backgroundColor: '#C2185B'
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="info"
          sx={{ width: '100%' }}
        >
          {removedProductName} removed from your wishlist
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Wishlist;
