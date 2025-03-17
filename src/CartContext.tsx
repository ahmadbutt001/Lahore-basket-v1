// import React, { createContext, useState, useEffect, ReactNode, useMemo, useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Define types for cart item
// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// }

// // Define types for context
// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => Promise<void>;
//   removeFromCart: (itemId: number) => Promise<void>;
//   updateQuantity: (itemId: number, quantity: number) => Promise<void>;
//   cartQuantity: number;
//   loadingItems: Set<number>; // Track loading state per product
// }

// // Create context with default values
// const defaultCartContext: CartContextType = {
//   cart: [],
//   addToCart: async () => {
//     throw new Error('addToCart function not implemented');
//   },
//   removeFromCart: async () => {
//     throw new Error('removeFromCart function not implemented');
//   },
//   updateQuantity: async () => {
//     throw new Error('updateQuantity function not implemented');
//   },
//   cartQuantity: 0,
//   loadingItems: new Set(),
// };

// export const CartContext = createContext<CartContextType>(defaultCartContext);

// // Define props for CartProvider
// interface CartProviderProps {
//   children: ReactNode;
// }

// export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartQuantity, setCartQuantity] = useState<number>(0);
//   const [loadingItems, setLoadingItems] = useState<Set<number>>(new Set());

//   // Load cart from AsyncStorage on app start
//   useEffect(() => {
//     const loadCart = async () => {
//       try {
//         const savedCart = await AsyncStorage.getItem('cart');
//         if (savedCart) {
//           const cart: CartItem[] = JSON.parse(savedCart);
//           setCart(cart);
//         }
//       } catch (error) {
//         console.error('Error loading cart:', error);
//       }
//     };
//     loadCart();
//   }, []);

//   // Update cartQuantity whenever cart changes
//   useEffect(() => {
//     const quantity = cart.reduce((total, item) => total + item.quantity, 0);
//     setCartQuantity(quantity);
//   }, [cart]);

//   // Save cart to AsyncStorage
//   const saveCartToStorage = async (updatedCart: CartItem[]) => {
//     try {
//       await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
//     } catch (error) {
//       console.error('Error saving cart to AsyncStorage:', error);
//     }
//   };

//   // Add to cart function
//   const addToCart = async (item: CartItem) => {
//     setLoadingItems((prev) => new Set(prev).add(item.id)); // Start loading for this item
//     try {
//       let updatedCart = [...cart];
//       const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);

//       if (existingItemIndex !== -1) {
//         updatedCart[existingItemIndex].quantity += 1;
//       } else {
//         updatedCart.push({ ...item, quantity: 1 });
//       }

//       setCart(updatedCart);
//       await saveCartToStorage(updatedCart);
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//     } finally {
//       setLoadingItems((prev) => {
//         const updated = new Set(prev);
//         updated.delete(item.id);
//         return updated;
//       }); // Stop loading for this item
//     }
//   };

//   // Remove from cart function
//   const removeFromCart = async (itemId: number) => {
//     setLoadingItems((prev) => new Set(prev).add(itemId)); // Start loading for this item
//     try {
//       const updatedCart = cart.filter((item) => item.id !== itemId);
//       setCart(updatedCart);
//       await saveCartToStorage(updatedCart);
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     } finally {
//       setLoadingItems((prev) => {
//         const updated = new Set(prev);
//         updated.delete(itemId);
//         return updated;
//       }); // Stop loading for this item
//     }
//   };

//   // Update quantity function
//   const updateQuantity = async (itemId: number, quantity: number) => {
//     setLoadingItems((prev) => new Set(prev).add(itemId)); // Start loading for this item
//     try {
//       const updatedCart = cart
//         .map((item) =>
//           item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
//         )
//         .filter((item) => item.quantity > 0); // Remove item if quantity is 0

//       setCart(updatedCart); // Update state
//       await saveCartToStorage(updatedCart); // Save to AsyncStorage
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     } finally {
//       setLoadingItems((prev) => {
//         const updated = new Set(prev);
//         updated.delete(itemId);
//         return updated;
//       }); // Stop loading for this item
//     }
//   };

//   // Memoize context value
//   const cartContextValue = useMemo(() => ({
//     cart,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     cartQuantity,
//     loadingItems,
//   }), [cart, cartQuantity, loadingItems]);

//   return (
//     <CartContext.Provider value={cartContextValue}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook for consuming the context
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };



import React, { createContext, useState, useEffect, ReactNode, useMemo, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define types for context
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>; // Add clearCart function
  cartQuantity: number;
  loadingItems: Set<number>; // Track loading state per product
}

// Create context with default values
const defaultCartContext: CartContextType = {
  cart: [],
  addToCart: async () => {
    throw new Error('addToCart function not implemented');
  },
  removeFromCart: async () => {
    throw new Error('removeFromCart function not implemented');
  },
  updateQuantity: async () => {
    throw new Error('updateQuantity function not implemented');
  },
  clearCart: async () => {
    throw new Error('clearCart function not implemented');
  },
  cartQuantity: 0,
  loadingItems: new Set(),
};

export const CartContext = createContext<CartContextType>(defaultCartContext);

// Define props for CartProvider
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [loadingItems, setLoadingItems] = useState<Set<number>>(new Set());

  // Load cart from AsyncStorage on app start
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          const cart: CartItem[] = JSON.parse(savedCart);
          setCart(cart);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, []);

  // Update cartQuantity whenever cart changes
  useEffect(() => {
    const quantity = cart.reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(quantity);
  }, [cart]);

  // Save cart to AsyncStorage
  const saveCartToStorage = async (updatedCart: CartItem[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error saving cart to AsyncStorage:', error);
    }
  };

  // Add to cart function
  const addToCart = async (item: CartItem) => {
    setLoadingItems((prev) => new Set(prev).add(item.id)); // Start loading for this item
    try {
      let updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ ...item, quantity: 1 });
      }

      setCart(updatedCart);
      await saveCartToStorage(updatedCart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setLoadingItems((prev) => {
        const updated = new Set(prev);
        updated.delete(item.id);
        return updated;
      }); // Stop loading for this item
    }
  };

  // Remove from cart function
  const removeFromCart = async (itemId: number) => {
    setLoadingItems((prev) => new Set(prev).add(itemId)); // Start loading for this item
    try {
      const updatedCart = cart.filter((item) => item.id !== itemId);
      setCart(updatedCart);
      await saveCartToStorage(updatedCart);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setLoadingItems((prev) => {
        const updated = new Set(prev);
        updated.delete(itemId);
        return updated;
      }); // Stop loading for this item
    }
  };

  // Update quantity function
  const updateQuantity = async (itemId: number, quantity: number) => {
    setLoadingItems((prev) => new Set(prev).add(itemId)); // Start loading for this item
    try {
      const updatedCart = cart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
        )
        .filter((item) => item.quantity > 0); // Remove item if quantity is 0

      setCart(updatedCart); // Update state
      await saveCartToStorage(updatedCart); // Save to AsyncStorage
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoadingItems((prev) => {
        const updated = new Set(prev);
        updated.delete(itemId);
        return updated;
      }); // Stop loading for this item
    }
  };

  // Clear cart function
  const clearCart = async () => {
    try {
      setCart([]); // Clear cart in state
      await AsyncStorage.removeItem('cart'); // Remove cart from AsyncStorage
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Memoize context value
  const cartContextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart, // Add clearCart to context value
    cartQuantity,
    loadingItems,
  }), [cart, cartQuantity, loadingItems]);

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for consuming the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};