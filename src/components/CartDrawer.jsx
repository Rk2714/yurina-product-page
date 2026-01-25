import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Load Stripe with your Vercel Environment Variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function CartDrawer() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    isCartOpen, 
    setIsCartOpen, 
    cartTotal,
    clearCart 
  } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState('cart'); // 'cart' | 'payment'
  const [clientSecret, setClientSecret] = useState('');

  // Reset step when closing
  const closeDrawer = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setStep('cart');
      setClientSecret('');
    }, 300);
  };

  const handleProceedToPayment = () => {
    // 1. Get ClientSecret from API
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: cartTotal }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setStep('payment');
      })
      .catch((err) => console.error('Payment intent error:', err));
  };

  const handlePaymentSuccess = () => {
    closeDrawer();
    clearCart();
    navigate('/success');
  };

  // Stripe Elements Appearance
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#1E3A8A', // Indigo Blue
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      borderRadius: '12px',
    },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-2 text-leather-dark">
                {step === 'payment' && (
                  <button onClick={() => setStep('cart')} className="mr-2 hover:bg-gray-100 p-1 rounded-full">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <ShoppingBag size={20} />
                <span className="font-serif font-bold text-lg">
                  {step === 'cart' ? 'Your Collection' : 'Secure Checkout'}
                </span>
                {step === 'cart' && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <button 
                onClick={closeDrawer}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={closeDrawer}
                    className="text-leather font-bold underline decoration-leather/30 underline-offset-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Step 1: Cart Items List */}
                  {step === 'cart' && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {cartItems.map((item) => (
                        <motion.div 
                          layout
                          key={`${item.id}-${item.monogram}`} 
                          className="flex gap-4 bg-white"
                        >
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            {item.monogram && (
                              <div className="absolute bottom-1 right-1">
                                <span className="text-[10px] font-serif font-bold text-gold-foil tracking-widest">
                                  {item.monogram}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                              <h4 className="font-serif font-bold text-gray-900">{item.name}</h4>
                              {item.monogram && (
                                <p className="text-xs text-leather mt-1 flex items-center gap-1">
                                  Monogram: <span className="font-bold">{item.monogram}</span>
                                </p>
                              )}
                            </div>
                            <div className="flex justify-between items-end">
                              <p className="font-medium text-gray-900">¥{item.price.toLocaleString()}</p>
                              
                              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                <button 
                                  onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.monogram, -1) : removeFromCart(item.id, item.monogram)}
                                  className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white shadow-sm transition-all"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.monogram, 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white shadow-sm transition-all"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Step 2: Stripe Payment Form */}
                  {step === 'payment' && clientSecret && (
                    <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                      <CheckoutForm amount={cartTotal} onSuccess={handlePaymentSuccess} />
                    </Elements>
                  )}
                  {step === 'payment' && !clientSecret && (
                    <div className="flex justify-center py-10">
                      <div className="w-8 h-8 border-2 border-leather rounded-full animate-spin border-t-transparent"></div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer Summary (Visible in Cart Step) */}
            {cartItems.length > 0 && step === 'cart' && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>¥{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-leather-dark pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>¥{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-leather-dark text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all group"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
