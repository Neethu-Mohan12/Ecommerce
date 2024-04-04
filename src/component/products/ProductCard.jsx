import React, { useContext } from "react";
import CartContext from "../../context/cart/CartContext";
import { addToCart } from "../../context/cart/actions";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const { cart, dispatchCart } = useContext(CartContext);

  const handleAddToCart = () => {
 

   
    const existingProduct = cart.products.find(item => item.id === product.id);
    

    if (existingProduct) {
     
      dispatchCart({
        type: 'INCREMENT_QUANTITY',
        payload: product.id
      });
      toast.success(`${product.title} quantity increased`, { position: "top-center" });
    } else {
     
      dispatchCart(addToCart(product));
      toast.success(`${product.title} added to cart`, { position: "top-center" });
    }
  };

  return (
    <div className="p-5 shadow-2xl hover:scale-105 duration-300 shadow-black flex flex-col cursor-pointer bg-white">
      <h1 className="text-xl font-bold">{product.title}</h1>
      <h1>{product.brand}</h1>
      <img className="h-28 object-contain" src={product.images[0]} alt="images" />
      <p>{product.description}</p>
      <h1 className="text-orange-600 font-bold text-xl">₹{product.price}</h1>
      <div className="flex justify-between">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 rounded p-2 shadow-black uppercase hover:text-white"
        >
          add to cart
        </button>
        <button>
          <i className="fa-solid fa-heart text-red-700 text-2xl hover:scale-105 duration-150"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
