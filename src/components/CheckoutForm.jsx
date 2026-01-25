import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { ArrowRight, Lock, AlertCircle } from 'lucide-react';

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
    setErrorMessage(null);

    // Stripe側で入力値の検証を行い、エラーがあれば即座に返す
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success`,
      },
      redirect: 'if_required', 
    });

    if (error) {
      // エラーメッセージを日本語化したり、分かりやすく表示
      const msg = error.type === 'card_error' || error.type === 'validation_error'
        ? error.message
        : '決済処理中に予期せぬエラーが発生しました。もう一度お試しください。';
      setErrorMessage(msg);
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-6">
        {/* Shipping Address */}
        <div>
          <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2 mb-3">
            配送先住所 (Shipping)
          </h3>
          <AddressElement options={{ mode: 'shipping', allowedCountries: ['JP'] }} />
        </div>
        
        {/* Payment Details */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2 mb-3">
            お支払い情報 (Payment)
          </h3>
          <PaymentElement options={{ layout: "tabs" }} />
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-100">
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        disabled={!stripe || isProcessing}
        type="submit"
        className="w-full bg-leather-dark text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-70 group shadow-lg shadow-leather/20"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            処理中...
          </>
        ) : (
          <>
            ¥{amount.toLocaleString()} を支払う
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
      
      <p className="text-center text-[10px] text-gray-400">
        <Lock size={10} className="inline mr-1" />
        お支払いはStripeにより暗号化され、安全に処理されます。
      </p>
    </form>
  );
}
