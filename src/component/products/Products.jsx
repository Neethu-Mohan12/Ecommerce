
import { useEffect,useState} from "react";
import AddProduct from "./AddProduct";
import ProductCard from "./ProductCard";
import axios from "axios";
import { toast } from 'react-toastify';


function Products(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    
  useEffect(()=>{
    setLoading(true);
    (async()=>{
      try{
        const{data}=await axios.get("http://localhost:3000/products");
        if(data.success){
          setProducts(data.products);
          setLoading(false);
        }else{
          toast.error(data.err_msg,{position:"top-center"});
          setLoading(false);
        }
      
      }catch(error){
        console.log(error);
        toast.error(error.message,{positon:"top-center"});
        setLoading(false);
      }
    })();
  },[]);
    return loading?(
        <div className="flex min-h-screen justify-center items-center">
            Loading...
        </div>
    ):(
        <>
        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-10">
            {products?.map(product=>(
            <ProductCard key={product.id} product={product}/>
            ))}
        </div>
       <AddProduct/>
        </>
    );
    
}
export default Products;