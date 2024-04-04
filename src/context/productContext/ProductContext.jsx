
import axios from "axios";
import { createContext,useEffect,useState } from "react";



const ProductContext=createContext({});

export const ProductDataProvider=({children})=>{
    const[products,setProducts]=useState([]);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        setLoading(true);
        axios.get("http://localhost:3000/products").then(res=>{
            setProducts(res.data.products);
            setLoading(false);
    // })
    // .catch(error => { 
    //     setError(error.message);
    //     setLoading(false);
    });
    },[]);

    return(
        <ProductContext.Provider value={{products,loading}}>
            {children}
        </ProductContext.Provider>
    );
};
export default ProductContext;