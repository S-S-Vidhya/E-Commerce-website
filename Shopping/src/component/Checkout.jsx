import React, { useContext, useState } from "react"; 
import {
  Box, Typography, TextField, Button, Grid, Paper, Divider, Avatar,
  Radio, RadioGroup, FormControlLabel, FormLabel, MenuItem, ListItemIcon, ListItemText, Modal
} from "@mui/material";
import GPayIcon from "@mui/icons-material/AccountBalanceWallet";
import PhonePeIcon from "@mui/icons-material/PhoneIphone";
import PaytmIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CartContext } from "./CardContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bolt } from "@mui/icons-material";


const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    upiApp: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [openModal, setOpenModal] = useState(false);
  const { cart, clearCart } = useContext(CartContext); // Get cart and clearCart from context

  // Remove fetchCart and cartData since we're using context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Step 1: Add order to orders.json
      await axios.post("http://localhost:5000/orders", {
        items: cart, // Use cart from context instead of cartData
        total: calculateTotal(),
        customer: form,
        date: new Date().toLocaleString(),
      });
  
      // Step 2: Clear cart using context function (this updates both backend and UI)
      await clearCart(); // This replaces the manual deletion loop
  
      // Step 3: Show success modal
      setOpenModal(true);
      setTimeout(() => setOpenModal(false), 5000);
  
      // Step 4: Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        upiApp: ""
      });
  
      // Step 5: Play sound
      const audio = new Audio("/game-level-complete-143022.mp3");
      audio.play();
  
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2); // Use cart from context
  };

  // ... rest of your component remains the same, just replace cartData with cart ...

  return (
    <Box p={3} mt={5}>
      <style>
        {`
          @keyframes easeInTick {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { transform: scale(1); }
          }

          @keyframes confettiFall {
            0% { transform: translateY(-100%) rotate(0); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }

          .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: pink;
            opacity: 0.8;
            animation: confettiFall 2s ease-out forwards;
            border-radius: 50%;
          }
        `}
       </style>
      <Typography variant="h4" sx={{ mb: 3, color: "#D81B60", textAlign: "center", fontWeight: "bold" ,fontFamily:'serif'}}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2} sx={{color: "#D81B60" }} gutterBottom>Order Summary</Typography>
            <Divider sx={{ mb: 2 }} />
      
      {/* Change cartData to cart in the Order Summary section */}
      {cart.map((item) => (
        <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
       
       <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={item.image} alt={item.name} sx={{ width: 100, height: 100 }} />
                  <Box>
                    <Typography mb={1}>{item.name}</Typography>
                   <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                </Box>                </Box>
                 <Typography fontWeight="bold">₹{(item.price * item.quantity).toFixed(2)}</Typography>
              </Box>
           ))}

             <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" sx={{fontWeight:'bold'}}>Total</Typography>
              <Typography variant="h6" color="#D81B60">₹{calculateTotal()}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" mb={3} sx={{color: "#D81B60" }} gutterBottom>Shipping & Payment Details</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Address" name="address" value={form.address} onChange={handleChange} fullWidth required />
                </Grid>                 <Grid item xs={12} sm={6}>
                  <TextField label="City" name="city" value={form.city} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="ZIP Code" name="zip" value={form.zip} onChange={handleChange} fullWidth required />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2}} />
                  <FormLabel component="legend" sx={{color: "#D81B60",mb:2 }}>Choose Payment Method</FormLabel>
                  <RadioGroup row value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} >
                    <FormControlLabel value="upi" control={<Radio />} label="UPI" />                     <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />                   </RadioGroup>                 </Grid>
                
                {paymentMethod === "upi" && (
                  <Grid item xs={12}>
                    <TextField
                      select
                      label="Select UPI App"
                      name="upiApp"
                      value={form.upiApp}
                      onChange={handleChange}
                      fullWidth
                      required
                   
                    >
                      <MenuItem value="gpay">
                        <Box display="flex" alignItems="center" gap={1}>
                          <GPayIcon  sx={{ color: "#4285F4" }}/> Google Pay
                        </Box>
                      </MenuItem>
                      <MenuItem value="phonepe">
                        <Box display="flex" alignItems="center" gap={1}>
                          <PhonePeIcon  sx={{ color: "#5B2CAF" }} /> PhonePe
                        </Box>
                      </MenuItem>
                      <MenuItem value="paytm">
                        <Box display="flex" alignItems="center" gap={1}>
                          <PaytmIcon sx={{ color: "#002970" }} /> Paytm
                        </Box>
                      </MenuItem>
                    </TextField>
                  </Grid>
                )}

                {paymentMethod === "cod" && (
                  <Grid item xs={12}>
                    <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                      You will pay <strong>₹{calculateTotal()}</strong> on delivery.
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12} textAlign="center">
                  <Button type="submit" variant="contained" sx={{ backgroundColor: "#D81B60", px: 4 }}>
                    Place Order
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {/* Order Placed Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          width:'200px',
          height:'200px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          p: 3,
          textAlign: 'center',
          overflow: 'hidden',
          borderRadius:'50%',
        }}>
          {[...Array(30)].map((_, i) => (
            <Box
              key={i}
              className="confetti"
              sx={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
                animationDelay: `${Math.random()}s`
              }}
            />
          ))}
          <CheckCircleIcon sx={{ color: 'green', fontSize: 120,mt:2, animation: 'easeInTick 0.5s ease-in-out' }} />
          <Typography variant="h5" fontWeight="bold" color="#D81B60">Order Placed</Typography>
          <Button variant="contained" component={Link} to="/orders" sx={{ backgroundColor: "#D81B60", color:'white'}}>View Orders</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Checkout;
