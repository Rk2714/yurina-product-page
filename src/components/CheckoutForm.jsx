import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { ArrowRight, Lock } from 'lucide-react';

export default function CheckoutForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success`,
      },
      redirect: 'if_required', // Important: Handle redirect manually if needed, or stay for success
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else {
      // Payment succeeded!
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        {/* Stripe Address Element */}
        <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
          Shipping Information
        </h3>
        <AddressElement options={{ mode: 'shipping', allowedCountries: ['JP'] }} />
        
        {/* Stripe Payment Element */}
        <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2 pt-4 border-t border-gray-100">
          Payment Details
        </h3>
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <button
        disabled={!stripe || isProcessing}
        type="submit"
        className="w-full bg-leather-dark text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-70 group shadow-lg shadow-leather/20"
      >
        {isProcessing ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Pay ¥{amount.toLocaleString()}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
      
      <p className="text-center text-[10px] text-gray-400">
        <Lock size={10} className="inline mr-1" />
        Payments are secure and encrypted by Stripe.
      </p>
    </form>
  );
}
