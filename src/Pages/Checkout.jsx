import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, TextField, Button, Grid, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Checkout.css';
import PaymentForm from './PaymentForm';
import StripePayment from './StripePayment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.items);
  // const loginId = useSelector(state => state.auth.user.id);
  // console.log("Cart Items:", cartItems);
  // console.log("Login ID:", loginId);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber:''
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentSuccess = async () => {
    console.log('payment success')
    try {
      // const response = await fetch("http://localhost:5001/api/orders", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     login_id: loginId,
      //     total_amount: totalAmount,
      //     date: new Date().toISOString().slice(0, 10) 
      //   }),
      // });

      //if (response.ok) {
      //   cartItems.map(async(item) => {

      //   const formData = new FormData();
      //   //formData.append('order_date', orderDate);
      //   formData.append('order_amount', totalAmount);
      //   formData.append('login_id', loginId);
      //   formData.append('product_id',item.id)
        


      //   try {
      //     const response = await axios.post("http://localhost:5001/api/orders", formData, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data'
      //       }
      //     });
      //     console.log('order details uploaded successfully', response.data);
      //   } catch (error) {
      //     console.error('Error uploading order details', error);
      //   }           
      // })

        //navigate('/success');
      // } else {
      //   console.error('Failed to place order');
      // }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Shipping Info:', shippingInfo);
    console.log('Total Amount:', totalAmount);
    handlePaymentSuccess();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box textAlign="center" my={4}>
          <Typography variant="h4" component="h1">
            Checkout
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} className="checkout-section">
                <Typography variant="h6" gutterBottom>
                  Shipping Information
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Full Name"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleShippingChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Phone Number"
                  name="phoneNumber"
                  value={shippingInfo.phoneNumber}
                  onChange={handleShippingChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="City"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Postal Code"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleShippingChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Country"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleShippingChange}
                  margin="normal"
                  required
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} className="checkout-section">
                <Typography variant="h6" gutterBottom>
                  Payment Details
                </Typography>
                {/* <PaymentForm /> */}
                <StripePayment shippingInfo={shippingInfo}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} className="checkout-section">
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                {cartItems.map((item) => (
                  <Typography key={item.id} variant="body1">
                    {item.product_name} - ${item.product_price} x {item.quantity}
                  </Typography>
                ))}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Total: ${totalAmount}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Checkout;
