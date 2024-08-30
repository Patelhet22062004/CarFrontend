import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addItem = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setCartTotal((prevTotal) => prevTotal + item.price);
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    setCartTotal((prevTotal) => prevTotal - (cartItems.find(item => item.id === id)?.price || 0));
  };

  return (
    <CartContext.Provider value={{ cartItems, cartTotal, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
