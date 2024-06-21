import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../Auth/cartSlice';
import { Container, Typography, Box, Button, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {Buffer} from 'buffer';

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

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decrementQuantity(id));
    } else {
      alert("Minimum quantity reached. Remove item from cart?");
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box textAlign="center" my={4}>
          <Typography variant="h4" component="h1">
            Your Shopping Cart
          </Typography>
        </Box>
        {cartItems.length > 0 ? (
          <Grid container spacing={4}>
            {cartItems.map(item => (
              <Grid item xs={12} key={item.id}>
                <Card sx={{ display: 'flex', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 160, height: 160, objectFit: 'cover' }}
                    image={"data:image/png;base64,"+Buffer.from(item.product_image.data,
                      "binary" ).toString("base64")}
                    alt={item.product_name}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent>
                      <Typography variant="h6">{item.product_name}</Typography>
                      <Typography variant="body1" color="textSecondary">
                        ${item.product_price}
                      </Typography>
                      <Box display="flex" alignItems="center" mt={2}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleDecrement(item.id, item.quantity)}
                        >
                          &ndash;
                        </Button>
                        <Typography variant="body1" mx={2}>
                          {item.quantity}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                          +
                        </Button>
                      </Box>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          console.log("Removing item with ID:", item.id);
                          dispatch(removeFromCart(item.id));
                        }}
                        sx={{ mt: 2 }}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" align="center" mt={4}>
            Your cart is empty.
          </Typography>
        )}
        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Cart;
