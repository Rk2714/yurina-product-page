import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Shield, Truck, CreditCard, ShoppingBag, Star, Info, Edit3 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));
  const relatedProducts = products.filter(p => p.id !== parseInt(id)).slice(0, 3);

  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); 
  // const [showCartToast, setShowCartToast] = useState(false); // No longer needed
  
  // Monogram State
  const [monogram, setMonogram] = useState('');
  const [showMonogramInput, setShowMonogramInput] = useState(false);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, 1, monogram);
    // setShowCartToast(true); // CartDrawer opens automatically now
  };

  const handleCheckout = async () => {
    // Direct checkout logic (optional, now we prefer Cart flow)
    addToCart(product, 1, monogram);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Toast Notification Removed - Using Cart Drawer Instead */}

      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-leather-dark mb-12 transition-colors">
        <ArrowLeft size={20} /> Back to Collection
      </Link>

      <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
        {/* Product Image & Monogram Preview */}
        <div className="relative">
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-xl"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Monogram Overlay */}
            {monogram && (
              <div className="absolute bottom-10 right-10 pointer-events-none">
                 <span className="text-4xl font-serif font-bold tracking-widest text-gold-foil opacity-90" style={{ fontFamily: 'Times New Roman, serif' }}>
                   {monogram}
                 </span>
              </div>
            )}
          </motion.div>
          <p className="text-center text-xs text-gray-400 mt-4">
             ※画像はイメージです。実際は職人が手作業で刻印します。
          </p>
        </div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-leather font-bold tracking-widest uppercase text-sm">New Arrival</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-leather-dark mt-4 mb-2">{product.name}</h1>
          {product.tagline && (
             <p className="text-lg text-gray-500 mb-4 font-light tracking-wide">{product.tagline}</p>
          )}
          <p className="text-3xl text-leather-light font-medium mb-8">{product.priceStr} <span className="text-sm text-gray-400 font-normal">(Tax Included)</span></p>

          <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light">
            {product.description}
          </p>

          {/* Monogram Option */}
          <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setShowMonogramInput(!showMonogramInput)}>
               <div className="flex items-center gap-2 text-leather-dark font-bold">
                 <Edit3 size={18} />
                 <span>Personalize (Free)</span>
               </div>
               <span className="text-sm text-leather underline">
                 {showMonogramInput ? 'Close' : 'Add Monogram'}
               </span>
            </div>
            
            <AnimatePresence>
              {showMonogramInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm text-gray-500 mb-2">Enter your initials (Up to 3 characters):</label>
                  <input 
                    type="text" 
                    maxLength={3}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    placeholder="e.g. K.T"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-lg font-serif tracking-widest focus:outline-none focus:border-leather transition-colors"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Gold foil stamping will be applied to the bottom right corner.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            {['details', 'care', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors relative ${
                  activeTab === tab ? 'text-leather-dark' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'details' && 'Specs'}
                {tab === 'care' && 'Care Guide'}
                {tab === 'reviews' && 'Reviews'}
                {activeTab === tab && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-leather-dark" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 mb-8 min-h-[200px]">
            <AnimatePresence mode="wait">
              {activeTab === 'details' && (
                <motion.ul 
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {product.details && product.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <div className="mt-1 min-w-[20px]"><Check size={16} className="text-leather" /></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </motion.ul>
              )}

              {activeTab === 'care' && (
                <motion.div
                  key="care"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-gray-600 leading-relaxed"
                >
                  <div className="flex gap-3 mb-2 text-leather">
                    <Info size={20} />
                    <span className="font-bold">Maintenance</span>
                  </div>
                  {product.care}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, idx) => (
                      <div key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                        <div className="flex items-center gap-2 mb-1">
                           <div className="flex text-yellow-400">
                             {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                           </div>
                           <span className="text-xs font-bold text-gray-400">{review.user}</span>
                        </div>
                        <p className="text-sm text-gray-600">"{review.text}"</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">No reviews yet.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
             <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white border-2 border-leather-dark text-leather-dark py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
            
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="flex-[2] bg-leather-dark text-white py-4 rounded-full font-bold text-lg hover:bg-black transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-leather/20"
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CreditCard size={20} />
                  Checkout
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Related Products Section */}
      <div className="border-t border-gray-200 pt-16">
        <h3 className="text-2xl font-serif font-bold text-leather-dark mb-8">You Might Also Like</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {relatedProducts.map(p => (
             <Link key={p.id} to={`/product/${p.id}`} className="group block">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h4 className="font-serif font-bold text-lg text-gray-900 group-hover:text-leather">{p.name}</h4>
                <p className="text-gray-500">{p.priceStr}</p>
             </Link>
           ))}
        </div>
      </div>

    </div>
  );
}
