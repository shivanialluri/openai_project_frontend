//PaymentForm.js

import React, { useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const PAYMENT_SUCESS_URL = "http://localhost:3000/success";

const PaymentForm = (props) => {
	console.log("payment form props"+props.shippingInfo.fullName)
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const cartItems = useSelector(state => state.cart.items);
  //const loginId = useSelector(state => state.auth.user.id);
  var isLoggedIn = JSON.parse(localStorage.getItem('user'));

  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
    setTotalAmount(total);
	console.log("total amount"+total)
  }, [cartItems]);

  const handlePaymentSuccess = async (phoneNumber) => {
    const formData = new FormData();
        formData.append('To',"+1"+phoneNumber);
        formData.append('From',  '+18559972544');
        formData.append('Parameters', '{ "order":"Hello! Your order has been placed succesfully"}');
        
	
	  var config = {
		method: 'post',
		url: 'https://studio.twilio.com/v2/Flows/FW2944fceeb5e800edc2fa8c7fa0ff4f6f/Executions',
		headers: { 
		   
		  'Content-Type': 'application/x-www-form-urlencoded'
		},
		auth: {
			username: "AC7398a9e0c534c88f8ada504c2b1fb43f",
			password: "af04f0a1c92e150ea7a33c3d364fa57b"
		 },
		data : formData
	  };
	  
	  axios(config)
	  .then(function (response) {
		console.log(JSON.stringify(response.data));
	  })
	  .catch(function (error) {
		console.log(error);
	  });
	  
  };

	const handleSubmit = async (e) => {
    console.log("payment started"+stripe)
    console.log("payment started"+elements)
		e.preventDefault();


    
		if (!stripe || !elements) return;

		setIsLoading(true);
		setMessage("Payment in Progress");

		cartItems.map(async(item) => {

			const formData = new FormData();
			//formData.append('order_date', orderDate);
			// formData.append('order_amount', totalAmount);
			// formData.append('login_id', loginId);
			// formData.append('product_id',item.id)


			
	
	
			try {
			  const response = await axios.post("http://localhost:5001/api/orders", {
				"order_amount":totalAmount,
				"login_id":isLoggedIn.id,
				"product_id":item.id,
				"fullName":props.shippingInfo.fullName,
				"address":props.shippingInfo.address,
				"phoneNumber":props.shippingInfo.phoneNumber,
				"city":props.shippingInfo.city,
				"zipcode":props.shippingInfo.postalCode,
				"country":props.shippingInfo.country
			  }, {
				headers: {
				  'Content-Type': 'application/json'
				}
			  });
			  const phoneNumber = response.data.phone_number;
			  console.log('order details uploaded successfully', response.data);
			  await handlePaymentSuccess(phoneNumber);
			} catch (error) {
			  console.error('Error uploading order details', error);
			} 
		})
    

		// const resp = await stripe.confirmPayment({
		// 	elements,
		// 	confirmParams: {
		// 		return_url: PAYMENT_SUCESS_URL,
		// 	},
		// });

		//if (resp.error) setMessage("Some Error Occurred !!");
		setIsLoading(false);
		navigate('/orders');
		

	};

	return (
		<div className="container mx-auto">
			
				<div className="card w-100 bg-base-100 bg-gray-200 shadow-2xl rounded-lg">
					<div className="card-body p-6">
						{/* <h3 className="card-title font-bold text-2xl mb-4 justify-center">
							Complete your payment here!
						</h3> */}
						<PaymentElement />
            
						<div className="card-actions justify-center">
							<button
                style={{marginTop:10}}
                onClick={handleSubmit}
								className="btn btn-primary rounded-xl text-white px-4 py-2 mt-6"
								disabled={isLoading || !stripe || !elements}
							>
								{isLoading ? "Loading..." : "Pay now"}
							</button>
						</div>
						{message && <div>{message}</div>}
					</div>
				</div>
			
		</div>
	);
};

export default PaymentForm;
