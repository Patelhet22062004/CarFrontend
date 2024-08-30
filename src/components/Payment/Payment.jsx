import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../Paymentform';

const stripePromise = loadStripe('your-publishable-key-here');

const PaymentComponent = ({ cartItems, userDetails }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm cartItems={cartItems} userDetails={userDetails} />
    </Elements>
  );
};

export default PaymentComponent;
