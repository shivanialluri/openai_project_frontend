import React from 'react';
import latestProducts from '../Components/Assets/latestProducts';
import './Latest.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Product from '../Components/Product';
import { addToCart } from '../Auth/cartSlice';
import { Container, Typography, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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

const Latest = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products,setProducts] = React.useState([]);

    useEffect(()=>{
    
        fetchData();
      },[])
    
      async function fetchData(){
        try {
            const response = await axios.get("http://localhost:5001/api/products", {
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

    return (
        <ThemeProvider theme={theme}>
            <Container className="banner">
                <Typography variant="h2" component="h2" gutterBottom>
                    Discover Our Newest Masterpieces
                </Typography>
                <Grid container spacing={4} className="product-list">
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={3} md={3}>
                            <Product product={product} handleAddToCart={() => handleAddToCart(product)} />
                        </Grid>
                    ))}
                </Grid>
                {/* <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {products.map((product) => (
          <ImageListItem key={product.id}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box> */}
            </Container>
        </ThemeProvider>
    );
};

export default Latest;