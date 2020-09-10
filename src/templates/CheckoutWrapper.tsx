import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentEdit } from '../components/Payment';

const stripePromise = loadStripe(
  'pk_test_51HPfFxFA34kPfu6Y2EGNPmxDKHQjAZrzYFFSNRzmt7nt3n8MVHygafnYvH2vwwHJ8ym4Cij3Lr9yQtuQXoiZqYXO00PyTj3E6L'
);

const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentEdit />
    </Elements>
  );
};

export default CheckoutWrapper;
