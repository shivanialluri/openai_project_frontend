import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Avatar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signup, login } from '../Auth/authSlice';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var isLoggedIn = JSON.parse(localStorage.getItem('user'));
  const user = useSelector((state) => state.auth.user);

  useEffect(()=>{
    //console.log("dashboard logged in user value"+JSON.stringify(user))
    if(user && user.id){
      //console.log("dashboard logged in user value authenticated"+user.isAuthenticated)
      localStorage.setItem('user',JSON.stringify(user))
    }
  },[user])

  useEffect(()=>{
    if(isLoggedIn && isLoggedIn.id){
      navigate('/dashboard')
    }
  

  },[isLoggedIn])

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
    } else if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else {
      try {
        const response = await fetch('http://localhost:5001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }

        const data = await response.json();
        console.log('Sign up successful:', data);
        dispatch(signup(data)); // Dispatch signup action
        setSuccessMessage("Signup successful");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/dashboard');
        }, 2000);
        setError("");
      } catch (error) {
        console.error('There was a problem with the signup request:', error);
        setError(error.message);
      }
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
    } else {
      try {
        const response = await fetch('http://localhost:5001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }

        const data = await response.json();
        console.log('Login successful:', data.id);
        dispatch(login(data)); // Dispatch login action
        //localStorage.setItem('user',data.id);
        setSuccessMessage("Login successful");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/dashboard');
        }, 2000);
        setError("");
      } catch (error) {
        console.error('There was a problem with the login request:', error);
        setError(error.message);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box textAlign="center" my={4}>
          <Typography variant="h4" component="h1">
            {action}
          </Typography>
        </Box>
        <Box mb={2}>
          {action === "Sign Up" && (
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ width: 24, height: 24, marginRight: 1 }}>
                <PersonIcon />
              </Avatar>
              <TextField
                fullWidth
                variant="outlined"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
              />
            </Box>
          )}
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ width: 24, height: 24, marginRight: 1 }}>
              <EmailIcon />
            </Avatar>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Id"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ width: 24, height: 24, marginRight: 1 }}>
              <LockIcon />
            </Avatar>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
          </Box>
        </Box>
        {action === "Login" && (
          <Typography color="textSecondary" align="center">
            Forgot password? <Link to="/forgot-password" style={{ color: theme.palette.secondary.main }}>
              Click Here
            </Link>
          </Typography>
        )}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (action === "Login") handleLogin();
              else setAction("Login");
            }}
            sx={{ marginRight: 2 }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (action === "Sign Up") handleSignUp();
              else setAction("Sign Up");
            }}
          >
            Sign Up
          </Button>
        </Box>
        {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
        {showSuccess && <Typography color="primary" align="center" mt={2}>{successMessage}</Typography>}
      </Container>
    </ThemeProvider>
  );
};

export default LoginSignup;
 
