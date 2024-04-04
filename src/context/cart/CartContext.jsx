
import React, { createContext, useReducer } from "react";
import cartReducer from "./cartReducer";
import { initialState } from "./initialState";

const CartContext = createContext();

export const CartDataProvider = ({ children }) => {
  const [cart, dispatchCart] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
