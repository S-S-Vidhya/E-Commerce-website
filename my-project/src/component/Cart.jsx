import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, IconButton, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Add, Remove, Delete, ShoppingCart } from "@mui/icons-material";
import { CartContext } from "./CardContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const { updateQuantity, removeFromCart} = useContext(CartContext);

  const [cartData, setCartData] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      setCartData(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, amount) => {
    await updateQuantity(productId, amount);
    fetchCart(); 
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
    fetchCart();
  };
  
  

  return (
    <Box p={3} mt={2}>
      <Typography variant="h4" sx={{ mb: 3 , color: "#D81B60", textAlign: "center",fontFamily:'Dancing-script',fontWeight:'bold'}}>Shopping Cart
      </Typography>

      {cartData.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 4, textAlign: "center" }}>
          Your cart is empty. You can 
          <Button component={Link} to="/collection" sx={{ color: "#D81B60" }}>Continue Shopping</Button> 
          or explore our latest collection.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {cartData.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, display: "flex", flexDirection: "column", alignItems: "center", p: 2, height: "90%",width:'75%' }}>
                <CardMedia component="img" sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 2 }} image={item.image} alt={item.name} />
                <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Price: ₹{item.price}</Typography>
                  <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                    <IconButton onClick={() => handleQuantityChange(item.id, -1)} size="small">
                      <Remove />
                    </IconButton>
                    <Typography sx={{ mx: 1, fontWeight: "bold" }}>{item.quantity}</Typography>
                    <IconButton onClick={() => handleQuantityChange(item.id, 1)} size="small">
                      <Add />
                    </IconButton>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", width: "100%" }}>
                  <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
                    <Delete />
                  </IconButton>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#D81B60" }}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {cartData.length > 0 && (
        <Box mt={5} textAlign="center">
          <Typography variant="h5" sx={{ mb: 2 }}>
            Total: ₹{cartData.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </Typography>
          <Button  component={Link}
  to="/checkout"
  variant="contained"
  sx={{ backgroundColor: "#D81B60", fontSize: "16px", px: 4 }}>
            Proceed to Checkout
          </Button>
         
        </Box>
      )}
    </Box>
  );
};

export default Cart;


