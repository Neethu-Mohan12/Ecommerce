
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Router from "./routes/Router";
import { ProductDataProvider } from './context/productContext/ProductContext';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CartDataProvider } from './context/cart/CartContext';
import { OrderProvider } from './context/orderContext/OrderContext';
import { Provider } from 'react-redux';
// import {UserDataProvider} from ''
import store from './redux/store';

function App() {


  return (
    <>
    <Provider store={store}>
     <CartDataProvider>
      {/* <UserDataProvider> */}
      <ProductDataProvider>
      <OrderProvider> 
        <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Router/>}/>
          </Routes>
          </BrowserRouter>
          </OrderProvider>
      </ProductDataProvider>
      {/* </UserDataProvider> */}
     </CartDataProvider>
     <ToastContainer/>
     </Provider>
    </>
  );
}

export default App
