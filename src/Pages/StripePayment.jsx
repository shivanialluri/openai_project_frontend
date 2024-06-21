//StripePayment.js

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe('pk_test_51PPYvZ00XtpcZ0UF22Em0T1D99CbU7FQL6nkeUmwu7Qj6ck1mM2YxBCZvyWdF7sWGPY9iUlXr2i9BLTxfubCOjaW00b7aTBhEB');

const StripePayment = (props) => {
	console.log("stripe payemnt props"+props.shippingInfo)
	const [clientSecret, setClientSecret] = useState(null);

	useEffect(() => {
		axios
			.post("http://localhost:5001/create-payment-intent", {
				items: [{ id: 1, name: "momos", amount: 40.00 }],
			})
			.then((resp) => {
                console.log("client secret"+resp.data.clientSecret);
                setClientSecret(resp.data.clientSecret);
            })
	}, []);

	const options = {
		clientSecret,
		theme: "stripe",
	};

	return (
		clientSecret && (
			<Elements stripe={stripePromise} options={options}>
				<PaymentForm shippingInfo={props.shippingInfo}/>
			</Elements>
		)
	);
};

export default StripePayment;
