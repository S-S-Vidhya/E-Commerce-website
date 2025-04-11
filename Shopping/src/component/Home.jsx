import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/zoom";

// Import your images
import slide1 from '../assets/images/home1.png';
import slide2 from '../assets/images/home2.png';
import Collection from "./Collection";



const Home = () => {
  const swiperRef = useRef(null);

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
      <Box sx={{ width: "80%", overflow: "hidden", position: 'relative',display:'flex',marginX:'auto',marginTop:'10%'
      }}>
        <Swiper
          modules={[Zoom, Autoplay]}
          zoom={{ maxRatio: 1.5 }}
          autoplay={{ delay: 3000 }}
          loop={true}
          style={{
            height: "430px",
            width: "100%",
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box sx={{
                display: 'flex',
                flexDirection: slide.layout === "text-right" ? 'row-reverse' : 'row',
                height: '100%',
                alignItems: 'center',
                backgroundColor: slide.bgColor,
              }}>
                <Box sx={{
                  width: { xs: '100%', md: '50%' },
                  padding: '0 5%',
                  zIndex: 2,
                  backgroundColor: slide.bgColor, // Set background color to match content
                }}>
                  <Typography variant="h3" fontWeight={'bold'} sx={{color:slide.textColor,fontFamily:'serif'}}>
                    {slide.title}
                  </Typography>
                  <Typography variant="h6" sx={{color:slide.textColor === 'brown' ? '#8B5E3C' : '#666', 
               my:2 }}>
                    {slide.subtitle}
                  </Typography>
                  <Button variant="contained" sx={{backgroundColor:slide.buttonColor}}
                  component={Link}
                  to={slide.link}>
                    {slide.buttonText.toUpperCase()}
                  </Button>
                </Box>
                
                <Box sx={{
                  position: { xs: 'absolute', md: 'relative' },
                  width: { xs: '100%', md: '50%' },
                  height: '100%',
                  overflow: 'hidden',
                 
                  backgroundColor: slide.bgColor,
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
      <Typography sx={{ color: "#D81B60", textAlign: "center",mt:10,fontFamily:'serif',fontWeight:'bold',fontSize:'1.5rem'}} >Explore Our Products</Typography>
    <Collection/>
    </>
  );
};

export default Home;




