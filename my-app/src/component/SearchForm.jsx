import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment,
  Divider,
  Chip,
  Autocomplete
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';

const popularCities = [
  { label: 'Delhi' },
  { label: 'Mumbai' },
  { label: 'Bangalore' },
  { label: 'Hyderabad' },
  { label: 'Chennai' },
  { label: 'Kolkata' },
  { label: 'Pune' },
  { label: 'Jaipur' },
];

const SearchForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [journeyDate, setJourneyDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    console.log('Searching for:', { 
      from, 
      to, 
      journeyDate: journeyDate.format('YYYY-MM-DD'),
      returnDate: returnDate?.format('YYYY-MM-DD')
    });
  };

  return (
    <Box sx={{
      backgroundImage: 'url(https://thumbs.dreamstime.com/b/cars-passenger-bus-driving-asphalt-road-urban-city-panorama-high-skyscrapers-cityscape-background-skyline-flat-horizontal-142471029.jpg?w=1400)',    
      py: 6,
      color: 'white',
    }}>
      <Container maxWidth="lg">
      <Typography 
            variant={isMobile ? 'h4' : 'h2'} 
            gutterBottom
            sx={{
              textAlign:'center',
              fontWeight: 'bold',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
              color: 'white',
              lineHeight: 1,
              mt:3
             
            }}
          >
            Book <span style={{ color: '#ff6d00' }}>Bus</span> Tickets
            Across <span style={{ color: '#1565c0' }}>India</span>
          </Typography>

        <Paper elevation={6} sx={{ 
          width:'100%',
          p: 1,
          borderRadius: 2,
          backgroundColor: 'white',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          {/* Trip Type Toggle */}
          <Box sx={{ 
            display: 'flex',
            mb: 3,
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            overflow: 'hidden'
          }}>
            <Button
              fullWidth
              variant={!isRoundTrip ? 'contained' : 'text'}
              onClick={() => setIsRoundTrip(false)}
              sx={{
                py: 1.5,
                borderRadius: 0,
                fontWeight: 'bold',
                backgroundColor: !isRoundTrip ? '#1a73e8' : 'transparent',
                color: !isRoundTrip ? 'white' : 'text.primary',
                '&:hover': {
                  backgroundColor: !isRoundTrip ? '#1565c0' : 'rgba(0,0,0,0.04)'
                }
              }}
            >
              One Way
            </Button>
            <Button
              fullWidth
              variant={isRoundTrip ? 'contained' : 'text'}
              onClick={() => setIsRoundTrip(true)}
              sx={{
                py: 1.5,
                borderRadius: 0,
                fontWeight: 'bold',
                backgroundColor: isRoundTrip ? '#1a73e8' : 'transparent',
                color: isRoundTrip ? 'white' : 'text.primary',
                '&:hover': {
                  backgroundColor: isRoundTrip ? '#1565c0' : 'rgba(0,0,0,0.04)'
                }
              }}
            >
              Round Trip
            </Button>
          </Box>

          <Grid container spacing={2}>
            {/* From Location */}
           <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                freeSolo
                options={popularCities}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="From City"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                value={from}
                onChange={(event, newValue) => {
                  setFrom(newValue?.label || newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  setFrom(newInputValue);
                }}
              />
            </Grid>

            {/* Swap Button */}
            <Grid item xs={12} sm={2} md={1} sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <IconButton
                onClick={handleSwap}
                sx={{
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                <SwapHorizIcon />
              </IconButton>
            </Grid>

            {/* To Location */}
            <Grid item xs={12} sm={5} md={4}>
              <Autocomplete
                freeSolo
                options={popularCities}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="To City"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                value={to}
                onChange={(event, newValue) => {
                  setTo(newValue?.label || newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  setTo(newInputValue);
                }}
              />
            </Grid>

            {/* Journey Date */}
            <Grid item xs={12} sm={6} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Departure Date"
                  value={journeyDate}
                  onChange={(newValue) => setJourneyDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      InputProps: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon color="primary" />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            {/* Return Date (conditionally rendered) */}
            {isRoundTrip && (
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Return Date"
                    value={returnDate}
                    onChange={(newValue) => setReturnDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon color="primary" />
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            )}

            {/* Search Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                size="small"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{
                  py:1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#ff6d00',
                  color: 'rgba(0,0,0,0.87)',
                  '&:hover': {
                    backgroundColor: '#f9a825',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
              >
                SEARCH BUSES
              </Button>
            </Grid>
          </Grid>

          {/* Popular Routes */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Popular Routes:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['Delhi - Jaipur', 'Mumbai - Pune', 'Bangalore - Chennai', 'Hyderabad - Vijayawada'].map((route) => (
                <Chip
                  key={route}
                  label={route}
                  onClick={() => {
                    const [fromCity, toCity] = route.split(' - ');
                    setFrom(fromCity);
                    setTo(toCity);
                  }}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#e3f2fd'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SearchForm;

