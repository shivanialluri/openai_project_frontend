import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, List, ListItem, ListItemText, Link as MuiLink, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ReceiptIcon from '@mui/icons-material/Receipt';

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

const Profile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const email = user ? user.email : '';
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box textAlign="center" my={4}>
          <Typography variant="h4" component="h1">
            Profile Settings
          </Typography>
        </Box>
        
        <Box mb={4}>
          <Typography variant="h6" component="h2">
            Account Settings
          </Typography>
          <List>
            <ListItem button component={Link} to="/settings">
              <SettingsIcon style={{ marginRight: '10px' }} />
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button component={Link} to="/account">
              <AccountCircleIcon style={{ marginRight: '10px' }} />
              <ListItemText primary="Account" />
            </ListItem>
            {/* <ListItem button component={Link} to="/orders">
              <ReceiptIcon style={{ marginRight: '10px' }} />
              <ListItemText primary="Orders" />
            </ListItem> */}
            <ListItem button component={Link} to="/change-password">
              <LockIcon style={{ marginRight: '10px' }} />
              <ListItemText primary="Change Password" />
            </ListItem>
          </List>
        </Box>
        
        <Divider />

        <Box mt={4}>
          <Typography variant="h6" component="h2">
            Storefront
          </Typography>
          <List>
            <ListItem>
              <StorefrontIcon style={{ marginRight: '10px' }} />
              <ListItemText
                primary="Manage your own storefront?"
                secondary={
                  <MuiLink component={Link} to="/storefront" color="secondary">
                    Click here to start!
                  </MuiLink>
                }
              />
            </ListItem>
            {isAuthenticated && email === 'allurishivani16@gmail.com' && (
              <ListItem button onClick={handleAdminClick}>
                <AdminPanelSettingsIcon style={{ marginRight: '10px' }} />
                <ListItemText primary="Admin" />
              </ListItem>
            )}
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
