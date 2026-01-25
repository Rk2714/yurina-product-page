import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, quantity = 1, monogram = '') => {
    setCartItems(prev => {
      // 同じ商品で、かつ刻印も同じなら数量を増やす
      const existingItem = prev.find(item => item.id === product.id && item.monogram === monogram);
      if (existingItem) {
        return prev.map(item => 
          (item.id === product.id && item.monogram === monogram)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // 新しいアイテムを追加
      return [...prev, { ...product, quantity, monogram }];
    });
    setIsCartOpen(true); // 追加したらカートを開く
  };

  const removeFromCart = (id, monogram) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.monogram === monogram)));
  };

  const updateQuantity = (id, monogram, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.monogram === monogram) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      isCartOpen, 
      setIsCartOpen,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}
