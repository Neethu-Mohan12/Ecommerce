
import { ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY,CLEAR_CART} from "./actionType";

const cartReducer = (cart = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            
            const existingProductIndex = cart.products.findIndex(item => item.id === action.payload.id);
            if (existingProductIndex !== -1) {
                
                const updatedProducts = cart.products.map((item, index) => {
                    if (index === existingProductIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
                    return item;
                });
                return {
                    ...cart,
                    products: updatedProducts
                };
            } else {
                // If the product doesn't exist, add it to the cart
                return {
                    ...cart,
                    products: [...cart.products, { ...action.payload, quantity: 1 }]
                };
            }
        case REMOVE_FROM_CART:
            return {
                ...cart,
                products: cart.products.filter((item) => item.id !== action.payload)
            };
            case INCREMENT_QUANTITY:
                const updatedCart =
                 {
                  ...cart,
                  products: cart.products.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                  )
                };
                // console.log("Updated cart state:", updatedCart);
                return updatedCart;
              
        case DECREMENT_QUANTITY:
            return {
                ...cart,
                products: cart.products.map(item =>
                    item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                )
            };
            case CLEAR_CART:
            return {
                ...cart,
                products: []
            };
        default:
            return cart;
    }
};

export default cartReducer;

