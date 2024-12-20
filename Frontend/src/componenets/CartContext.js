import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { config } from "../App";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      // Only proceed if token and userId exist
      if (token && userId) {
        try {
          const response = await axios.get(`${config.endpoint}/cart/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCartLength(response.data.items.length);
        } catch (err) {
          console.error('Failed to fetch cart items', err);
        }
      }
    };

    fetchCartItems();
  }, []);
  


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
