import React from 'react';
import allProducts from '../Components/Assets/allProducts';
import './Sale.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../Auth/cartSlice';
import Product from '../Components/Product';
import { Container, Typography, Grid, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
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

const Sale = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saleproducts,setSaleProducts] = React.useState([]);

  useEffect(()=>{
    
    fetchData();
  },[])

  async function fetchData(){
    try {
        const response = await axios.get("http://localhost:5001/api/sale/products", {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('order details uploaded successfully', response.data);
        setSaleProducts(response.data);
      } catch (error) {
        console.error('Error uploading order details', error);
      }
  }

  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      dispatch(addToCart(product));
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  //const saleProducts = allProducts.filter((product) => product.price < 15);
  const calculateDiscountedPrice = (price) => {
    return price * 0.9; // Assuming a 10% discount for simplicity
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box className="box" textAlign="center" my={4}>
          <Typography variant="h2" component="h2">
            BIG SALE
          </Typography>
        </Box>
        <Grid container spacing={4} className="product-list">
          {saleproducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} className="product-wrapper sale-product">
              <Product
                sale={true}
                product={product}
                handleAddToCart={() => handleAddToCart(product)}
              />
              {/* <Box className="price-overlay">
                <Typography variant="body2" color="textSecondary" style={{ textDecoration: 'line-through', marginRight: '10px' }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="secondary">
                  ${calculateDiscountedPrice(product.price).toFixed(2)}
                </Typography>
              </Box> */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Sale;
