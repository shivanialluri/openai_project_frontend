//PaymentSuccess.js

 
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate('/dashboard');
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '10px',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'justify',
            }}
        >
            <h1 className="font-bold text-xl">Your Payment is successful!</h1>
            <h4 style={{ marginTop: '10px', fontSize: '20px' }}>Your order has been successfully placed</h4>
            <p
                onClick={handleContinueShopping}
                style={{
                    marginTop: '10px',
                    fontSize: '20px',
                    color: 'blue',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                }}
            >
                Continue Shopping
            </p>
        </div>
    );
}

export default PaymentSuccess;