import React, { useContext } from "react";
import CartContext from "../../context/cart/CartContext";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { pathname } = useLocation();
  const user=useSelector(state=>state.user.user);
  console.log(user);
  return (
    <div className="p-4 z-50 sticky top-0 flex justify-between items-center bg-black/30 backdrop-blur">
      <Link to="/login"><div><i className="fa-solid fa-right-to-bracket ms-8 cursor-pointer text-xl"></i>
      </div></Link>
      <h1 className="text-2xl uppercase font-bold ms-5"><Link to="/">{user?.username}</Link></h1>
        {/* <Link to="/">{user.username}</Link> */}
   
      {pathname === "/cart"||pathname==="/order" ? (
        <Link to="/">
          <i className="fa-solid fa-house text-xl"></i>
        </Link>
      ) : (
        <div className="flex justify-between items-end gap-3 me-5 text-xl">
          <div className="relative">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping text-xl hover:text-yellow-950 cursor-pointer"></i>
              <div className="w-3 h-4 absolute -top-1 right-0 bg-red-700 rounded-full flex justify-center">
                <p className="text-xs text-white">{cart?.products?.length}</p>
              </div>
            </Link>
          </div>
          <Link to="/order" className="hover:text-yellow-950 font-bold">
  Orders
</Link>

        </div>
      )}
    </div>
  );
}

export default Navbar;

