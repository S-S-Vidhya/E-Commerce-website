// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/cart");
//         setCart(response.data);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//       }
//     };
//     fetchCart();
//   }, []);

//   const addToCart = async (product) => {
//     try {
//       const existingItem = cart.find((item) => item.id === product.id);

//       if (existingItem) {
//         const updatedQuantity = existingItem.quantity + 1;
//         await axios.patch(`http://localhost:5000/cart/${product.id}`, {
//           quantity: updatedQuantity,
//         });

//         setCart((prevCart) =>
//           prevCart.map((item) =>
//             item.id === product.id
//               ? { ...item, quantity: updatedQuantity }
//               : item
//           )
//         );
//       } else {
//         const response = await axios.post("http://localhost:5000/cart", {
//           ...product,
//           quantity: 1,
//         });
//         setCart((prevCart) => [...prevCart, response.data]);
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const updateQuantity = async (productId, amount) => {
//     try {
//       const item = cart.find((item) => item.id === productId);
//       if (!item) return;

//       const newQuantity = Math.max(1, item.quantity + amount);
//       await axios.patch(`http://localhost:5000/cart/${productId}`, {
//         quantity: newQuantity,
//       });

//       setCart((prevCart) =>
//         prevCart.map((item) =>
//           item.id === productId ? { ...item, quantity: newQuantity } : item
//         )
//       );
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:5000/cart/${productId}`);
//       setCart(cart.filter(item => item.id !== productId));
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };

//   const clearCart = async () => {
//     try {
//       await axios.delete("http://localhost:5000/cart/clear");
//       setCart([]); // This clears the local state
//       return true;
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//       return false;
//     }
//   };
 
  
//   return (
//     <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart,clearCart}}>
//       {children}
//     </CartContext.Provider>
//   );
// };




import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        const updatedQuantity = existingItem.quantity + 1;
        await axios.patch(`http://localhost:5000/cart/${product.id}`, {
          quantity: updatedQuantity,
        });
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: updatedQuantity }
              : item
          )
        );
      } else {
        const response = await axios.post("http://localhost:5000/cart", {
          ...product,
          quantity: 1,
        });
        setCart((prevCart) => [...prevCart, response.data]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateQuantity = async (productId, amount) => {
    try {
      const item = cart.find((item) => item.id === productId);
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + amount);
      await axios.patch(`http://localhost:5000/cart/${productId}`, {
        quantity: newQuantity,
      });

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${productId}`);
      setCart(cart.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const deletePromises = cart.map((item) =>
        axios.delete(`http://localhost:5000/cart/${item.id}`)
      );
      await Promise.all(deletePromises);
      setCart([]);
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
