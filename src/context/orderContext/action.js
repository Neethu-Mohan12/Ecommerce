
export const ADD_TO_ORDER = 'ADD_TO_ORDER';

export const addToOrder = (products) => ({
    type: ADD_TO_ORDER,
    payload: { products },
});
