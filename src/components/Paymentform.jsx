import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const { items, userDetails } = location.state || { items: [], userDetails: {} };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    
    try {
      alert('Payment successful!');
      navigate('/ticket', { state: { items, userDetails } });
      } catch (error) {
        console.error('Error processing payment:', error);
        // Handle error
        }
        };
      console.log(items);

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
