import React, { useRef } from "react";
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/zoom";
import slide1 from '../assets/images/home1.png';
import slide2 from '../assets/images/home2.png';
import Collection from "./Collection";

const Home = () => {
  const swiperRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const slides = [
    {
      title: "Explore Our Collections",
      subtitle: "Timeless pieces for every occasion",
      bgImage: slide1,
      link: "/collection",
      buttonText: "Shop now",
      align: "left",
      zoomLevel: '90%',
      bgColor:'#f8f0e5',
      textColor:'brown',
      buttonColor: "#D81B60",
      layout: "text-left", 
    },
    {
      title: "New Arrivals",
      subtitle: "Elegant rings for every special moment",
      bgImage: slide2,
      link: "/newarrivals",
      buttonText: "View New Arrivals",
      align: "right",
      zoomLevel: '90%',
      bgColor:'#f8f0e5',
      textColor:'brown',
      buttonColor: "#D81B60",
      layout: "text-right", 
    }
  ];

  return (
    <>
      <Box sx={{ 
        width: { xs: "95%", sm: "90%", md: "85%" }, 
        overflow: "hidden", 
        position: 'relative',
        marginX: 'auto',
        marginTop: { xs: '15%', sm: '10%' },
        borderRadius: '8px',
        boxShadow: 3
      }}>
        <Swiper
          modules={[Zoom, Autoplay]}
          zoom={{ maxRatio: 1.5 }}
          autoplay={{ delay: 3000 }}
          loop={true}
          style={{
            height: isMobile ? "500px" : "430px",
            width: "100%",
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : (slide.layout === "text-right" ? 'row-reverse' : 'row'),
                height: '100%',
                alignItems: 'center',
                backgroundColor: slide.bgColor,
                position: 'relative'
              }}>
                {/* Text Content */}
                <Box sx={{
                  width: isMobile ? '100%' : '50%',
                  padding: isMobile ? '20px' : '0 5%',
                  zIndex: 2,
                  textAlign: isMobile ? 'center' : 'left',
                  order: isMobile ? 2 : 'unset',
                  py: isMobile ? 3 : 0
                }}>
                  <Typography 
                    variant={isMobile ? "h4" : "h3"} 
                    fontWeight={'bold'} 
                    sx={{
                      color: slide.textColor,
                      fontFamily: 'serif',
                      lineHeight: 1.2
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography 
                    variant={isMobile ? "body1" : "h6"} 
                    sx={{
                      color: slide.textColor === 'brown' ? '#8B5E3C' : '#666', 
                      my: 2,
                      lineHeight: 1.5
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <Button 
                    variant="contained" 
                    sx={{
                      backgroundColor: slide.buttonColor,
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      px: 3,
                      py: 1
                    }}
                    component={Link}
                    to={slide.link}
                  >
                    {slide.buttonText.toUpperCase()}
                  </Button>
                </Box>
                
                {/* Image Content */}
                <Box sx={{
                  width: isMobile ? '100%' : '50%',
                  height: isMobile ? '60%' : '100%',
                  overflow: 'hidden',
                  backgroundColor: slide.bgColor,
                  order: isMobile ? 1 : 'unset'
                }}>
                  <Box
                    component="img"
                    src={slide.bgImage}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Typography sx={{ 
        color: "#D81B60", 
        textAlign: "center",
        mt: { xs: 6, sm: 10 },
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: { xs: '1.25rem', sm: '1.5rem' }
      }}>
        Explore Our Products
      </Typography>
      
      <Collection/>
    </>
  );
};

export default Home;