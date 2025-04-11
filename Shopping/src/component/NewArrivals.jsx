// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Box, Typography, Grid, Button, IconButton } from "@mui/material";
// import { Favorite, ShoppingCart } from "@mui/icons-material";
// import { CartContext } from "./CardContext";
// import { WishlistContext } from "./WishlistContext";

// const NewArrivals = () => {
//   const [newArrivals, setNewArrivals] = useState([]);
//   const { addToCart } = useContext(CartContext);
//   const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/products?new=true") 
//       .then((response) => setNewArrivals(response.data))
//       .catch((error) => console.error("Error fetching new arrivals:", error));
//   }, []);

//   const handleWishlistToggle = (product) => {
//     if (wishlist.some((item) => item.id === product.id)) {
//       removeFromWishlist(product.id);
//     } else {
//       addToWishlist(product);
//     }
//   };

//   return (
//     <Box p={3} mt={2}>
//       <Typography variant="h4" sx={{ color: "#D81B60", textAlign: "center", mb: 5,fontFamily:'serif',fontWeight:'bold'}}>
//         New Arrivals
//       </Typography>
//       <Grid container spacing={3}>
//         {newArrivals.length > 0 ? (
//           newArrivals.map((product) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//               <Box
//               width={250}
//                 border="1px solid #ddd"
//                 borderRadius={2}
//                 p={2}
//                 textAlign="center"
//                 sx={{ transition: "0.3s", "&:hover": { boxShadow: 3, transform: "scale(1.05)" } }}
//               >
//                 <Box position="relative">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
//                   />
//                   <IconButton
//                     onClick={() => handleWishlistToggle(product)}
//                     sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "rgba(255,255,255,0.7)" }}
//                   >
//                     <Favorite color={wishlist.some((item) => item.id === product.id) ? "error" : "inherit"} />
//                   </IconButton>
//                 </Box>
//                 <Typography mt={1}>{product.name}</Typography>
//                 <Typography variant="body1" color="text.secondary">${product.price}</Typography>
//                 <Box mt={1} display="flex" justifyContent="center" gap={1}>
//                   <Button variant="contained" onClick={() => addToCart(product)} sx={{ backgroundColor: "#D81B60" }}>
//                     Add to Cart
//                   </Button>
//                 </Box>
//               </Box>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", width: "100%", mt: 5 }}>
//             No new arrivals available.
//           </Typography>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default NewArrivals;



import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box, Typography, Grid, Button, IconButton, Rating, Chip } from "@mui/material";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { CartContext } from "./CardContext";
import { WishlistContext } from "./WishlistContext";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products?new=true") 
      .then((response) => setNewArrivals(response.data))
      .catch((error) => console.error("Error fetching new arrivals:", error));
  }, []);

  const handleWishlistToggle = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const getDiscountedPrice = (price, discount) => {
    return (price - (price * discount / 100)).toFixed(2);
  };

  return (
    <Box p={3} mt={2}>
      <Typography variant="h4" sx={{ color: "#D81B60", textAlign: "center", mb: 5, fontFamily: 'serif', fontWeight: 'bold' }}>
        New Arrivals
      </Typography>
      <Grid container spacing={3}>
        {newArrivals.length > 0 ? (
          newArrivals.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Box
                width={250}
                border="1px solid #ddd"
                borderRadius={2}
                p={2}
                textAlign="center"
                sx={{ transition: "0.3s", "&:hover": { boxShadow: 3, transform: "scale(1.05)" } }}
              >
                <Box position="relative">
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
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <IconButton
                    onClick={() => handleWishlistToggle(product)}
                    sx={{ position: "absolute",bottom:-15, right: 10, backgroundColor: "rgba(255,255,255,0.7)" }}
                  >
                    <Favorite color={wishlist.some((item) => item.id === product.id) ? "error" : "inherit"} />
                  </IconButton>
                </Box>
                <Typography mt={1} fontWeight="bold">{product.name}</Typography>
                
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
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  {product.Discount > 0 ? (
                    <>
                      <Typography variant="body1" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                        ${product.price}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#D81B60', fontWeight: 'bold' }}>
                        ${getDiscountedPrice(product.price, product.Discount)}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      ${product.price}
                    </Typography>
                  )}
                </Box>
                
                <Box mt={1} display="flex" justifyContent="center" gap={1}>
                  <Button 
                    variant="contained" 
                    onClick={() => addToCart(product)} 
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
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", width: "100%", mt: 5 }}>
            No new arrivals available.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default NewArrivals;