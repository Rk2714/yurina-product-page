import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Success from './pages/Success';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence, motion } from 'framer-motion';

// Custom Cursor Component
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot fixed pointer-events-none z-[9999]"
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      />
      <motion.div
        className="cursor-outline fixed pointer-events-none z-[9998]"
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "spring", mass: 0.5, stiffness: 100, damping: 15 }}
      />
    </>
  );
}

import { useCart } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

// Simple Navigation Component
function Nav() {
  const { cartCount, setIsCartOpen } = useCart();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
      <div className="pointer-events-auto px-6 py-3">
        <a href="/" className="text-2xl font-serif font-bold tracking-widest hover:opacity-70 transition-opacity">LUXE</a>
      </div>
      <div className="pointer-events-auto bg-white/5 backdrop-blur-sm border border-white/10 px-8 py-4 rounded-full flex gap-8 text-sm font-medium shadow-2xl">
        <a href="/" className="hover:text-leather-light transition-colors tracking-widest uppercase text-xs">Collection</a>
        <a href="#story" className="hover:text-leather-light transition-colors tracking-widest uppercase text-xs">Philosophy</a>
        <span className="text-white/20">|</span>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="hover:text-leather-light transition-colors tracking-widest uppercase text-xs flex items-center gap-1"
        >
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <CartDrawer />
      <div className="bg-noise" /> {/* Global Noise Overlay */}
      
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
