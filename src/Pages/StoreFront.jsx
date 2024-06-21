// import React, { useState } from 'react';
// import { Container, Typography, Box, TextField, Button, Paper, Snackbar } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import axios from 'axios';
// import { useLocation, Link, useNavigate} from 'react-router-dom';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#3f51b5',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//   },
// });

// const StoreFront = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [productName, setProductName] = useState('');
//   const [productPrice, setProductPrice] = useState('');
//   const [productCategory, setProductCategory] = useState('');
//   const [productImage, setProductImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [openSnackbar, setOpenSnackbar] = useState(false);


//   const handleNameChange = (e) => setProductName(e.target.value);
//   const handlePriceChange = (e) => setProductPrice(e.target.value);
//   const handleProductCategory = (e) => setProductCategory(e.target.value);
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProductImage(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('product_name', productName);
//     formData.append('product_price', productPrice);
//     formData.append('product_category', productCategory);
//     formData.append('product_image', productImage);

//     try {
//       const response = await axios.post("http://localhost:5001/api/products", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log('Product uploaded successfully', response.data);
//       navigate('/sale');
//     } catch (error) {
//       console.error('Error uploading product', error);
//     }

//     setProductName('');
//     setProductPrice('');
//     setProductCategory('');
//     setProductImage(null);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="sm">
//         <Box textAlign="center" my={4}>
//           <Typography variant="h4" component="h1">
//             Sell your products
//           </Typography>
//           <Typography variant="h4" component="h1">
//             with
//           </Typography>
//           <Typography variant="h4" component="h1">
//             DigiArtHub
//           </Typography>
//         </Box>
//         <Paper elevation={3} sx={{ p: 4 }}>
//           <form onSubmit={handleSubmit}>
//             <Box mb={2}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Product Name"
//                 value={productName}
//                 onChange={handleNameChange}
//                 required
//               />
//             </Box>
//             <Box mb={2}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Product Price"
//                 type="number"
//                 value={productPrice}
//                 onChange={handlePriceChange}
//                 required
//               />
//             </Box>
//             <Box mb={2}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Product Category"
//                 value={productCategory}
//                 onChange={handleProductCategory}
//                 required
//               />
//             </Box>
//             <Box mb={2}>
//               <Button
//                 variant="contained"
//                 component="label"
//                 fullWidth
//               >
//                 Upload Product Image
//                 <input
//                   type="file"
//                   hidden
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   required
//                 />
//               </Button>
//             </Box>
//             {imagePreview && (
//               <Box mb={2} textAlign="center">
//                 <Typography variant="subtitle1">Image Preview:</Typography>
//                 <img src={imagePreview} alt="Product Preview" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
//               </Box>
//             )}
//             <Box textAlign="center">
//               <Button variant="contained" color="primary" type="submit">
//                 Upload Product
//               </Button>
//             </Box>
//             <Box textAlign="center">
//               <Typography variant="body2">
//                 <Link to="/manage-products" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
//                   Manage Your Existing Products
//                 </Link>
//               </Typography>
//             </Box>
//           </form>
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default StoreFront;

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, IconButton, Menu, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Card } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Buffer } from 'buffer';
import moment from 'moment';
import { useSelector } from 'react-redux';

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

const FlexContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 40px; /* Increased space above */
  gap: 40px;
`;

const OrdersContainer = styled(Box)`
  flex: 1;
  // margin-right: 20px;
`;

const FormContainer = styled(Box)`
  flex: 1;
`;

const CardsContainer = styled.div`
  display: flex;
  flex:3;
  flex-direction: column;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;
`;

const WrappedTypography = styled(Typography)`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const StoreFront = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [generatedImageText,setGeneratedImageText] = useState("");
  const [storeFrontProducts,setStoreFrontProducts] = useState("");

  const handleNameChange = (e) => setProductName(e.target.value);
  const handlePriceChange = (e) => setProductPrice(e.target.value);
  const handleProductCategory = (e) => setProductCategory(e.target.value);
  const handleGeneratedImageText = (e) => setGeneratedImageText(e.targer.value)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    generateImageContext(file)
    setProductImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const user = useSelector((state) => state.auth.user);
  var isLoggedIn = JSON.parse(localStorage.getItem('user'));

  const generateImageContext = async(file) => {
    // async function query(filename) {
      //const data = fs.readFileSync(file);
      const response = await fetch(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
        {
          headers: { 
            'Authorization': 'Bearer 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', 
            'Content-Type': 'image/jpeg'
          },
          method: "POST",
          body: file,
        }
      );
      const result = await response.json();
      setGeneratedImageText(result[0].generated_text);
      console.log("image generated response"+result[0].generated_text)
      //return result;
      //}
      // query("cats.jpg").then((response) => {
      // console.log(JSON.stringify(response));
      // });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_price', productPrice);
    formData.append('product_category', productCategory);
    formData.append('product_image', productImage);
    formData.append('generated_text',generatedImageText)

    try {
      const response = await axios.post("http://localhost:5001/api/products", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product uploaded successfully', response.data);
      navigate('/sale');
    } catch (error) {
      console.error('Error uploading product', error);
    }

    setProductName('');
    setProductPrice('');
    setProductCategory('');
    setProductImage(null);
  };

  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleEditPrice = () => {
    // edit price functionality
    handleMenuClose();
  };

  const handleMarkAsSold = () => {
    // sold functionality
    handleMenuClose();
  };

  const handleDeleteOrder = async () => {
    // try {
    //   await axios.delete(`http://localhost:5001/api/orders/${selectedOrder.id}`);
    //   setOrderData(orderData.filter(order => order.id !== selectedOrder.id));
    //   console.log('Order deleted successfully');
    // } catch (error) {
    //   console.error('Error deleting order', error);
    // }
    handleMenuClose();
  };

  useEffect(() => {
    fetchData();
    fetchStoreFrontProducts();
  }, []);

  async function fetchStoreFrontProducts() {
    try {
      const response = await axios.get("http://localhost:5001/api/products/"+isLoggedIn.id, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Order details fetched successfully', response.data);
      setStoreFrontProducts(response.data)
    } catch (error) {
      console.error('Error fetching order details', error);
    }
  }

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5001/api/orders/"+isLoggedIn.id, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Order details fetched successfully', response.data);
      setOrderData(response.data);
    } catch (error) {
      console.error('Error fetching order details', error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{width:'100%'}}>
        <FlexContainer>
        
          <OrdersContainer>
        
            <CardsContainer style={{height:'700px',overflowY:'scroll',padding:20}}>
            <Typography variant="h5" style={{justifyContent:"center",display:'flex'}}>My Products</Typography>
              {storeFrontProducts && storeFrontProducts.map((product) => (
                <StyledCard key={product.id}>
                  <img
                    src={"data:image/png;base64," + Buffer.from(product.product_image.data, "binary").toString("base64")}
                    alt={product.name}
                    style={{ width: '100px', height: '100px', marginRight: '10px' }}
                  />
                  <Box>
                    <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                      {product.product_name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p" style={{ fontWeight: 'bold' }}>
                      ${product.sale ? product.sale_price : product.product_price}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                      {"Full Name: " + product.full_name}
                    </Typography> */}
                    {/* <WrappedTypography variant="body2" color="textSecondary" component="p">
                      {product.address}, {product.city}, {product.zipcode}, {product.country}
                    </WrappedTypography>
                    <Typography variant="body2">
                      {"Phone: " + product.phone_number}
                    </Typography> */}
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                      Delivery Estimate - 3 weeks
                    </Typography> */}
                  </Box>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event, product)}
                    style={{ position: 'absolute', right: 10, top: 10 }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </StyledCard>
              ))}
            </CardsContainer>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEditPrice}>Edit Price</MenuItem>
              <MenuItem onClick={handleMarkAsSold}>Mark as Sold</MenuItem>
              <MenuItem onClick={handleDeleteOrder}>Delete Order</MenuItem>
            </Menu>
          </OrdersContainer>
          <Box sx={{ flex: 1, ml: 2 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" style={{justifyContent:"center",display:'flex'}}>Orders</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderData && orderData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.full_name}</TableCell>
                        <TableCell>{order.product_name}</TableCell>
                        <TableCell>{moment(order.date).format('YYYY-MM-DD hh:mm a')}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
          <FormContainer>
            <Paper elevation={3} sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Product Name"
                    value={productName}
                    onChange={handleNameChange}
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Product Price"
                    type="number"
                    value={productPrice}
                    onChange={handlePriceChange}
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Product Category"
                    value={productCategory}
                    onChange={handleProductCategory}
                    required
                  />
                </Box>
                <Box mb={2}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                  >
                    Upload Product Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </Button>
                </Box>
                {imagePreview && (
                  <Box mb={2} textAlign="center">
                    <Typography variant="subtitle1">Image Preview:</Typography>
                    <img src={imagePreview} alt="Product Preview" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
                  </Box>
                )}
                {imagePreview && (<Box mb={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Description"
                    value={generatedImageText}
                    onChange={handleGeneratedImageText}
                    required
                  />
                </Box>)}
                <Box textAlign="center">
                  <Button variant="contained" color="primary" type="submit">
                    Upload Product
                  </Button>
                </Box>
                <Box textAlign="center" mt={2}>
                  {/* <Typography variant="body2">
                    <Link to="/manage-products" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                      Manage Your Existing Products
                    </Link>
                  </Typography> */}
                </Box>
              </form>
            </Paper>
          </FormContainer>
        </FlexContainer>
      </div>
    </ThemeProvider>
  );
};

export default StoreFront;

