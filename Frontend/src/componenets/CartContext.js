import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cart/${userId}`);
        setCartLength(response.data.items.length)
      } catch (err) {
        console.error('Failed to fetch cart items', err);
      }
    };

    fetchCartItems();
  }, [userId]);


const updateCartLength = (newItems) => {
    setCartLength(newItems);
};

  return (
    <CartContext.Provider value={{ items, cartLength, updateCartLength }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
