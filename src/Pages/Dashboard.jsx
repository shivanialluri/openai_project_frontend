import React from 'react';
import { useEffect, useState } from 'react';
import allProducts from '../Components/Assets/allProducts';
import './Dasboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../Auth/cartSlice';
import Product from '../Components/Product';
import { Container, Typography, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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

const Dashboard = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products,setProducts] = React.useState([]);

    useEffect(()=>{
    
        fetchData();
      },[])
    
      async function fetchData(){
        try {
            const response = await axios.get("http://localhost:5001/api/products/dashboard", {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log('order details uploaded successfully', response.data);
            setProducts(response.data);
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

    //const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const processedProducts = allProducts.map(product => {
    //         if (product.price < 15) {
    //             return {
    //                 ...product,
    //                 originalPrice: product.price,  // Save the original price
    //                 price: product.price - 2  // Apply $2 discount
    //             };
    //         }
    //         return product;  // Return original product if price is $15 or more
    //     });

    //     setProducts(processedProducts);
    // }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container className="banner">
                <Typography variant="h2" component="h1" gutterBottom>
                    Have a look!
                </Typography>
                <Grid container spacing={4} className="products-container">
                    {products.map((product, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Product product={product} handleAddToCart={() => handleAddToCart(product)} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Dashboard;