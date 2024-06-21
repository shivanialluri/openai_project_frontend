import React, { useState, useEffect } from 'react';
import { Container, Typography, CardContent, CardMedia } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Buffer } from 'buffer';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const WrappedTypography = styled(Typography)`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

// const mediaStyle = css`
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
//   margin-right: 20px;
// `;

const contentStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


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

const Orders = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5001/api/orders", {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('order details uploaded successfully', response.data);
      setOrderData(response.data);
    } catch (error) {
      console.error('Error uploading order details', error);
    }
  }

  //   const formData = new FormData();
//     //formData.append('order_date', orderDate);
//     formData.append('order_amount', orderAmount);
//     formData.append('login_id', loginId);
    

    // try {
    //   const response = await axios.get("http://localhost:5001/api/orders", {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    //   console.log('order details uploaded successfully', response.data);
    //   setOrderData(response.data)
    // } catch (error) {
    //   console.error('Error uploading order details', error);
    // }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
        <CardsContainer>
        {orderData && orderData.map((product) => (
          <StyledCard key={product.id}>
            <CardMedia
              component="img"
              
              style={{width:270,height:300}}
              image={"data:image/png;base64," + Buffer.from(product.product_image.data, "binary").toString("base64")}
              alt={product.name}
            />
            <CardContent css={contentStyle}>
              <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                {product.product_name}
              </Typography>
              <Typography variant="h5" color="textSecondary" component="p" style={{ fontWeight: 'bold' }}>
                ${product.sale ? product.sale_price : product.product_price}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{fontWeight:'bold'}}>
                Order Information
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {"Full Name: "+product.full_name} 
              </Typography>
              <Typography variant="body2" style={{justifyContent:'flex-start'}}>
                Shipping Address
              </Typography>
              <WrappedTypography variant="body2" color="textSecondary" component="p">
                {product.address} {product.city} {product.zipcode} {product.country} 
              </WrappedTypography>
              <Typography variant="body2">
                {"Phone: "+product.phone_number}
              </Typography>
              {/* <Typography variant="body2" color="textSecondary" component="p">
                {product.city}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.zipcode}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.country}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.phone_number}
              </Typography> */}
              <Typography variant="body2" color="textSecondary" component="p" >
                Delivery Estimate - 3 weeks
              </Typography>
              {/* <Typography variant="body2" color="textSecondary" component="p">
                3 weeks
              </Typography> */}
            </CardContent>
          </StyledCard>
        ))}
           {/* <TableContainer component={Paper}>
          <Table>
            <TableHead style={useStyles.tableHead}>
              <TableRow>
                <TableCell style={useStyles.tableHeadCell}>Order ID</TableCell>
                <TableCell style={useStyles.tableHeadCell}>Customer Name</TableCell>
                <TableCell style={useStyles.tableHeadCell}>Date</TableCell>
                <TableCell style={useStyles.tableHeadCell}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData && orderData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell style={{ ...useStyles.tableBodyCell, ...useStyles.idCell }}>{order.id}</TableCell>
                  <TableCell style={useStyles.tableBodyCell}>{order.customer_name}</TableCell>
                  <TableCell style={useStyles.tableBodyCell}>{moment(order.date).format('YYYY-MM-DD hh:mm a')}</TableCell>
                  <TableCell style={useStyles.tableBodyCell}>{order.amount}</TableCell>
                  <TableCell style={useStyles.tableBodyCell}>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        </CardsContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Orders;
