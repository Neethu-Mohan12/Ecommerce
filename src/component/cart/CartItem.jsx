import React, { useContext, useState } from "react";
import CartContext from "../../context/cart/CartContext";
import { removeFromCart } from "../../context/cart/actions";

function CartItem({ product }) {
  const { dispatchCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(product.quantity); 

  const subtract = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleRemove = () => {
    dispatchCart(removeFromCart(product.id));
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    subtract();
  };

  return (
    <tr className="border-b">
      <td className="p-4">
        <img
          src={product.images[0]}
          alt=""
          className="h-[100px] w-[120px] relative left-20"
        />
      </td>
      <td className="relative left-28">
        <h1 className="text-lg font-semibold">{product.title}</h1>
        <p className="text-gray-500">{product.brand}</p>
      </td>
      <td className="p-4 text-right relative right-14">${product.price}</td>
      <td className="p-4 relative left-[70px]">
      
        {quantity}
        
        <button className="border p-1 bg-white border-black hover:bg-black hover:text-white relative right-10" onClick={handleIncrement}>
          +
        </button>
        <button className="border p-1 bg-white border-black hover:bg-black hover:text-white relative right-2" onClick={handleDecrement}>
          -
        </button>

        <i className="fa-solid fa-trash text-xl hover:text-red-700 relative left-10" onClick={handleRemove}></i>
      </td>
    </tr>
  );
}

export default CartItem;

