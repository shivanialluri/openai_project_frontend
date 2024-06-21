import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const ForgotPassword = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!name || !email) {
      setError('Please enter both your name and email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('Password reset request successful:', data);
      setSuccessMessage('If the email is registered, you will receive a password reset link.');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('There was a problem with the password reset request:', error);
      setError(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box textAlign="center" my={4}>
          <Typography variant="h4" component="h1">
            Forgot Password
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
