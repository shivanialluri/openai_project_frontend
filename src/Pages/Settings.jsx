import React, { useState } from 'react';
import { Container, Typography, Box, Button, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Divider } from '@mui/material';
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

const Settings = () => {
  const [themePreference, setThemePreference] = useState('light');
  const [language, setLanguage] = useState('en');
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [dataUsage, setDataUsage] = useState('medium');
  const [textSize, setTextSize] = useState('medium');

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', { themePreference, language, profileVisibility, dataUsage, textSize });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box textAlign="center" my={4}>
          <Typography variant="h4" component="h1">
            Settings
          </Typography>
        </Box>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography variant="h6" gutterBottom>
            Theme Selection
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Theme</InputLabel>
            <Select
              value={themePreference}
              onChange={(e) => setThemePreference(e.target.value)}
              label="Theme"
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Language Preference
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              label="Language"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="zh">Chinese</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Privacy Settings
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.checked)}
                name="profileVisibility"
                color="primary"
              />
            }
            label="Profile Visibility"
          />

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Data Usage
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Data Usage</InputLabel>
            <Select
              value={dataUsage}
              onChange={(e) => setDataUsage(e.target.value)}
              label="Data Usage"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Accessibility Options
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Text Size</InputLabel>
            <Select
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
              label="Text Size"
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Settings;
