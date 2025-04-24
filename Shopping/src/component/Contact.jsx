import React from "react";
import { Box, Typography, Grid, IconButton} from "@mui/material";
import { Email, Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ color: "#D81B60", p: 4, mt: 15 ,backgroundColor:'#f5f5f5'}}>
      <Grid container spacing={4} justifyContent="flex-start">
        
        {/* Quick Links */}
        <Grid item xs={12} sm={12} md={3}>
          <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 900, 
                        flex: 1, 
                        color: "#D81B60", 
                        letterSpacing: "2px",
                        fontFamily: "Dancing Script",
                        fontStyle: "normal",
                        mr:4,
                        mt:8
                      }}
                    >
                      Elite Spark
                    </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontFamily={"serif"} fontWeight={"bold"} mb={3}letterSpacing={1}>Quick Links</Typography>
          <Typography component={Link} to="/" sx={{ display: "block", color:'#D81B60"',textDecoration:'none'}}>Home</Typography>
          <Typography component={Link} to="/collection" sx={{ display: "block", color:'#D81B60', mt: 1,textDecoration:'none'}}>Collection</Typography>
          <Typography component={Link} to="/newarrivals" sx={{ display: "block", color:'#D81B60', mt: 1 ,textDecoration:'none'}}>New Arrivals</Typography>
          <Typography component={Link} to="/offers" sx={{ display: "block", color:'#D81B60', mt: 1,textDecoration:'none' }}>Offers</Typography>
        </Grid>

        {/* Customer Service */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" fontFamily={"serif"} fontWeight={"bold"} mb={3} letterSpacing={1}>Contact Us</Typography>
          <Typography component={Link} to="/address" sx={{ display: "block", color:'#D81B60', mt: 2 ,textDecoration:'none'}}> 📍 123, Fashion Street, Chennai, India</Typography>
          <Typography component={Link} to="/phoneno" sx={{ display: "block", color:'#D81B60', mt: 1 ,textDecoration:'none'}}>📞 +91 98765 43210</Typography>
          <Typography component={Link} to="/phoneno" sx={{ display: "flex",gap:1, color:'#D81B60', mt: 1.2 ,textDecoration:'none'}}> <Email/> support@elitespark.com</Typography>
         
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" fontFamily={"serif"} fontWeight={"bold"} mb={2}letterSpacing={2}>Follow Us</Typography>
          <Box>
            <IconButton sx={{ color:'#D81B60' }}><Facebook /></IconButton>
            <IconButton sx={{ color:'#D81B60' }}><Instagram /></IconButton>
            <IconButton sx={{ color:'#D81B60' }}><Twitter /></IconButton>
            <IconButton sx={{ color:'#D81B60' }}><YouTube /></IconButton>
          </Box>
        </Grid>
      </Grid>


      {/* Copyright Section */}
      <Typography variant="body2" align="center" mt={10} mb={10}> 
        © {new Date().getFullYear()} Elite Spark. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
