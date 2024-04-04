
import { ADD_TO_ORDER } from "./action";

const orderReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_ORDER:
            return {
                ...state,
                products: [...state.products, ...action.payload.products],
            };
       

        default:
            return state;
    }
};

export default orderReducer;
