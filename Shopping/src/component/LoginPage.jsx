import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Fade
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Diamond
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(4),
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: '16px',
  maxWidth: '500px',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const AccentButton = styled(Button)(({ theme }) => ({
  background: '#D81B60',
  color: '#FFFFFF',
  fontWeight: 'bold',
  padding: '12px 24px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#AD1457',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(216, 27, 96, 0.3)',
  },
}));

const DiamondIcon = styled(Diamond)(({ theme }) => ({
  color: '#D81B60',
  fontSize: '2.5rem',
  marginBottom: theme.spacing(2),
  filter: 'drop-shadow(0 0 4px rgba(216, 27, 96, 0.5))',
}));

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  return (
    <AuthContainer>
      <Fade in={true} timeout={800}>
        <AuthPaper elevation={10}>
          <Box textAlign="center" mb={4}>
            <DiamondIcon />
            <Typography variant="h4" component="h1" gutterBottom sx={{
              color: '#D81B60',
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              letterSpacing: '1px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Elite Spark
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Exclusive Member Access
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#D81B60' }} />
                  </InputAdornment>
                ),
                sx: {
                  color: '#F5F5F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D81B60',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D81B60',
                    borderWidth: '2px',
                  }
                }
              }}
              InputLabelProps={{
                sx: {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': {
                    color: '#D81B60',
                  },
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#D81B60' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: 'rgba(255,255,255,0.7)' }} />
                      ) : (
                        <Visibility sx={{ color: 'rgba(255,255,255,0.7)' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: '#F5F5F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D81B60',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D81B60',
                    borderWidth: '2px',
                  }
                }
              }}
              InputLabelProps={{
                sx: {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': {
                    color: '#D81B60',
                  },
                }
              }}
            />

            <Box mt={4} textAlign="center">
              <AccentButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disableElevation
              >
                Sign In
              </AccentButton>
            </Box>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              New to Elite Spark?{' '}
              <Typography
                component="span"
                sx={{
                  color: '#D81B60',
                  cursor: 'pointer',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={() => navigate('/signup')}
              >
                Create an account
              </Typography>
            </Typography>
          </Box>

          <Box mt={2} textAlign="center">
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.75rem',
                mt: 2
              }}
            >
              By continuing, you agree to our Terms and Conditions
            </Typography>
          </Box>
        </AuthPaper>
      </Fade>
    </AuthContainer>
  );
};

export default LoginPage;