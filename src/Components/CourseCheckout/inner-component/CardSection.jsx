import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const cardElementOptions = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const InjectedCheckoutForm = ({ props }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      // Handle the payment method on your server
      console.log('[PaymentMethod]', paymentMethod);
      
      // You would typically send the paymentMethod.id to your server here
      // await handleServerPayment(paymentMethod.id);
    }
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleReady = () => {
    console.log("CardElement ready");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <span className="h5 mr-3 d-block">
          <b>Credit Card Information</b>
        </span>
        <CardElement
          className="MyCardElement"
          options={cardElementOptions}
          onReady={handleReady}
          onChange={handleChange}
        />
      </div>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {succeeded && (
        <div className="alert alert-success" role="alert">
          Payment succeeded!
        </div>
      )}
      
      <button 
        type="submit" 
        disabled={!stripe || processing || succeeded}
        className="btn btn-primary"
      >
        {processing ? "Processing..." : succeeded ? "Payment Successful!" : "Pay Now"}
      </button>
    </form>
  );
};

export default InjectedCheckoutForm;