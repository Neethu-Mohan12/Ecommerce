
import {ADD_TO_CART} from "./actionType"
import { REMOVE_FROM_CART } from "./actionType"
import { CLEAR_CART } from "./actionType";



export const addToCart=(data)=>{
    return{
        type:ADD_TO_CART,
        payload:data
    }
}
export const removeFromCart = (productId) => {
    return {
      type: REMOVE_FROM_CART,
      payload: productId
    };
  };
 

export const clearCart = () => {
    return {
        type: CLEAR_CART
    };
};