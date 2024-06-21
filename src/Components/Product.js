// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addToCart } from '../Auth/cartSlice';
// import cartIcon from '../Components/Assets/cart_icon.png';
// import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
// import { css } from '@emotion/react';
// import {Buffer} from 'buffer';

// const cardStyle = css`
//   max-width: 345px;
//   margin: auto;
//   display: flex;
//   flex-direction: column;
// `;

// const mediaStyle = css`
//   height: 200px;
//   object-fit: cover;
// `;

// const cartIconStyle = css`
//   height: 10px; 
//   margin-right: 4px; 
// `;

// const priceAndButtonContainerStyle = css`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 16px;
// `;

// const addToCartBtnStyle = css`
//   background: #FD6585;
//   border-radius: 35px;
//   font-size: 10px;
// `;


// const Product = ({ product }) => {
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const navigate = useNavigate();

//   const handleAddToCart = () => {
//     if (isAuthenticated) {
//       dispatch(addToCart(product));
//       navigate('/cart');
//     } else {
//       navigate('/login');
//     }
//   };
  
//   const productImage = product.product_image?.data 
//     ? "data:image/png;base64," + Buffer.from(product.product_image.data, "binary").toString("base64")
//     : '';

//   return (
//     <Card css={cardStyle}>
//       <CardMedia
//         component="img"
//         css={mediaStyle}
//         // image={"data:image/png;base64," + Buffer.from(product.product_image.data,
//         //   "binary" ).toString("base64")}
//         image={productImage}
//         alt={product.name}
        
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {product.name}
//         </Typography>
//       </CardContent>
//       {/* <div css={priceAndButtonContainerStyle}>
//         <Typography variant="h6" color="textSecondary" component="p">
//           ${product.sale ? product.sale_price : product.product_price}
//         </Typography>
//         <Button 
//           size="small" 
//           variant='contained' 
//           onClick={handleAddToCart} 
//           css={addToCartBtnStyle}
//         >
//           Add to Cart
//         </Button>
//       </div> */}
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {product.product_name}
//         </Typography>
//         <Typography gutterBottom variant="body2" component="div" style={{ textTransform: 'capitalize' }} >
//           {product.generated_text}
//         </Typography>
//         <Typography variant="h5" color="textSecondary"  component="p">
//           ${product.sale? product.sale_price:product.product_price } 
//          <img src={cartIcon} alt="Add to Cart" css={cartIconStyle} />
//         </Typography>
//       </CardContent>
//       <CardActions>
//         {/* <Button size="small" style={{background:'#FD6585',borderRadius: 35,
//         fontSize: "10px"}} variant='contained' onClick={handleAddToCart} css={addToCartBtnStyle}>
//           <img src={cartIcon} alt="Add to Cart" css={cartIconStyle} />
//           Add to Cart
//         </Button> */}
//       </CardActions>
//     </Card>
//   );
// };


// export default Product;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../Auth/cartSlice';
import cartIcon from '../Components/Assets/cart_icon.png';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { css } from '@emotion/react';
import { Buffer } from 'buffer';

const cardStyle = css`
  max-width: 345px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const mediaStyle = css`
  height: 200px;
  object-fit: cover;
`;

const priceAndCartContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const priceStyle = css`
  font-weight: 40px;
  margin-right: 8px;
`;

const cartIconStyle = css`
  height: 20px;
  cursor: pointer;
`;

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  var isLoggedIn = JSON.parse(localStorage.getItem('user'));

  const handleAddToCart = () => {
    console.log("AddtoCart"+ isAuthenticated)
    if (isLoggedIn && isLoggedIn.id) {
      dispatch(addToCart(product));
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  const productImage = product.product_image?.data
    ? "data:image/png;base64," + Buffer.from(product.product_image.data, "binary").toString("base64")
    : '';

  return (
    <Card >
      <CardMedia
        component="img"
        
        image={productImage}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.product_name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div" style={{ textTransform: 'capitalize' }}>
          {product.generated_text}
        </Typography>
        <div style={{flexDirection:'row',justifyContent:'space-between',width:'100%',display:'flex',margin:'10px 10px 0px 10px',alignContent:'center'}}>
          <p style={{fontVariant:'bold',fontSize:19}}>
            ${product.sale ? product.sale_price : product.product_price}
            
          </p>
          <img src={cartIcon} alt="Add to Cart" width={20} height={20} onClick={handleAddToCart} />
          {/* <img src={cartIcon} alt="Add to Cart" css={cartIconStyle} onClick={handleAddToCart} /> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;

