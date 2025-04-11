import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import { FlashOn, LocalOffer, Star, Whatshot } from '@mui/icons-material';

const Offer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = () => {
    const difference = +new Date('2023-12-31') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Styled components
  const CountdownBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #D81B60 0%, #FF4081 100%)',
    borderRadius: '16px',
    padding: theme.spacing(3),
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(216, 27, 96, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
      animation: 'rotate 15s linear infinite',
      zIndex: 0
    }
  }));

  const TimeUnit = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: theme.spacing(2),
    minWidth: '80px',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }));

  const OfferCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)'
    }
  }));

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 },  }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              fontWeight: 500, 
              mb: 2, 
              background: 'linear-gradient(to right, #D81B60, #FF5252)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Exclusive Offers Coming Soon!
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              color: 'text.secondary', 
              mb: 6,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Get ready for our biggest sale of the year with discounts up to 70% on premium jewelry collections.
          </Typography>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div variants={itemVariants}>
          <CountdownBox 
            maxWidth="800px" 
            mx="auto" 
            mb={8}
            component={motion.div}
            variants={pulseVariants}
            animate="pulse"
          >
            <Typography variant="h5" sx={{ mb: 3, position: 'relative', zIndex: 1 }}>
              <FlashOn sx={{ verticalAlign: 'middle', mr: 1 }} />
              Offer Starts In:
            </Typography>
            
            <Grid container spacing={2} justifyContent="center" sx={{ position: 'relative', zIndex: 1 }}>
              <Grid item>
                <TimeUnit component={motion.div} whileHover={{ scale: 1.05 }}>
                  <Typography variant="h3" fontWeight={700}>
                    {timeLeft.days}
                  </Typography>
                  <Typography variant="body2">Days</Typography>
                </TimeUnit>
              </Grid>
              <Grid item>
                <TimeUnit component={motion.div} whileHover={{ scale: 1.05 }}>
                  <Typography variant="h3" fontWeight={700}>
                    {timeLeft.hours}
                  </Typography>
                  <Typography variant="body2">Hours</Typography>
                </TimeUnit>
              </Grid>
              <Grid item>
                <TimeUnit component={motion.div} whileHover={{ scale: 1.05 }}>
                  <Typography variant="h3" fontWeight={700}>
                    {timeLeft.minutes}
                  </Typography>
                  <Typography variant="body2">Minutes</Typography>
                </TimeUnit>
              </Grid>
              <Grid item>
                <TimeUnit component={motion.div} whileHover={{ scale: 1.05 }}>
                  <Typography variant="h3" fontWeight={700}>
                    {timeLeft.seconds}
                  </Typography>
                  <Typography variant="body2">Seconds</Typography>
                </TimeUnit>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                px: 6,
                py: 1.5,
                borderRadius: '50px',
                fontWeight: 700,
                background: 'white',
                color: '#D81B60',
                '&:hover': {
                  background: 'rgba(255,255,255,0.9)'
                },
                position: 'relative',
                zIndex: 1
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Notify Me
            </Button>
          </CountdownBox>
        </motion.div>

        {/* Coming Offers Preview */}
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              fontWeight: 700, 
              mb: 6,
              color: 'text.primary'
            }}
          >
            <LocalOffer sx={{ verticalAlign: 'middle', mr: 1, color: '#D81B60' }} />
            Sneak Peek at Upcoming Offers
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <OfferCard component={motion.div} whileHover={{ y: -10 }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Whatshot sx={{ fontSize: 60, color: '#FF5252', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Flash Sale
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    24 hours only! 50% off select items
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#D81B60', fontWeight: 700 }}>
                    Starting Soon
                  </Typography>
                </CardContent>
              </OfferCard>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <OfferCard component={motion.div} whileHover={{ y: -10 }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Star sx={{ fontSize: 60, color: '#FFC107', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Premium Collection
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    30% off our signature diamond jewelry
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#D81B60', fontWeight: 700 }}>
                    Limited Time
                  </Typography>
                </CardContent>
              </OfferCard>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <OfferCard component={motion.div} whileHover={{ y: -10 }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <LocalOffer sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Bundle Deal
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Buy 2 get 1 free on all earrings
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#D81B60', fontWeight: 700 }}>
                    Coming Up
                  </Typography>
                </CardContent>
              </OfferCard>
            </Grid>
          </Grid>
        </motion.div>

        {/* CTA Section */}
       
      </motion.div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default Offer;