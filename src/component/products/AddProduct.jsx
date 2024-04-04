import React from 'react'
import { useFormik } from 'formik';
import { useState } from 'react';
import {toast} from "react-toastify";
import axios from 'axios';
import * as Yup from 'yup';
import convertToBase64 from '../../utils/convertToBase64';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

function AddProduct() {
    const [modal, setModal] = useState(false);
    const [images,setImages]=useState([]);
    const [imageErr,setImageErr]=useState("");

    const getBase64Images=async files=>{
        try{
            const image64=[];
            for(let i=0;i<files.length;i++){
                const image=await convertToBase64(files[0]);
                image64.push(image);
            }
            setImages(image64);
        }catch(error){
            console.log(error);
        }
    };
    const formik=useFormik({
        initialValues:{
          title:"",
          brand:"",
          description:"",
          price:"",
          stock:"",
        },
        validationSchema:Yup.object({
          title:Yup.string()
          .min(3,"title should be atleast 3 characters")
          .required("please add a title"),
        
        brand:Yup.string()
          .min(3,"brand should be atleast a characters")
          .required("please add a brand"),
  
          description:Yup.string().min(100,"add more about product").required('please add descripton'),
          
          price:Yup.number().moreThan(0,"price cannot be less than 0")
          .required("please add a price"),
  
          stock:Yup.number()
          .moreThan(0,"stock cannot be less than 0")
          .required("please add stock of the product"),
      
        }),
        onSubmit:async values=>{
            try{
                if(images.length < 4){
                    setImageErr("please add 4 or more images");
                }
                else{
                    const {data}=await axios.post("http://localhost:3000/addproduct",{
                        ...values,
                        images:images,
                    });
                    if(data.success){
                      console.log("Product added successfully:", data);
                        setModal(false);
                        setImages([]);
                    }else{
                      console.error("Error adding product:", data.err_msg);
                        toast.error(data.err_msg,{position:"top-center"});
                    }
                  }
                } catch (error){
                    toast.error(error.message,{position:"top-center"});
                    console.log(error);
                }
            },
        
      });
  return (
    <>
       <button 
            className="fixed top-16 right-10 bg-white w-12 hover:bg-yellow-800"
            onClick={()=>setModal(true)}>
                <i className="fa-solid fa-plus text-xl"></i>
            </button>
            <PureModal
             header ="Add product "
             isOpen={modal}
              closeButtonPosition="bottom"
               onClose={() => {
               setModal(false);
              return true;
  }}
>
  <form onSubmit={formik.handleSubmit}  className="bg-yellow-300">
  <div className="flex flex-col">
          <label htmlFor="">title</label>
          <input
            className="border-2 border-yellow-700"
            type="text"
            name="title"
            value={formik.values.title}    
            onChange={formik.handleChange}
          />
           <p className="text-red-600 text-xs">{formik.errors.title}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">brand</label>
          <input
            className="border-2 border-yellow-700"
            type="text"
            name="brand"    
            value={formik.values.brand}    
            onChange={formik.handleChange}
          />
           <p className="text-red-600 text-xs">{formik.errors.brand}</p>
        </div>
        <div className="grid grid-cols-2">
          {images.map((ele,i)=>(
            <img key={i} className="border border-black" src={ele} alt="" />
          ))}
        </div>
        <p className="text-red-600 text-xs">
          {images.length <4 ? "please add 4 more images" :imageErr}
        </p>
        <input 
             type="file"
             multiple
             onChange={e=>getBase64Images(Array.from(e.target.files))}
         />
        <div className="flex flex-col">
          <label htmlFor="">description</label>
          <textarea
            className="border-2 border-yellow-700"
            name="description"  
            value={formik.values.description}    
            onChange={formik.handleChange}  
          />
           <p className="text-red-600 text-xs">{formik.errors.description}</p>
        </div>
     
        <div className="flex flex-col">
          <label htmlFor="">price</label>
          <input
            className="border-2 border-yellow-700"
            type="number"
            name="price"    
            value={formik.values.price}    
            onChange={formik.handleChange}
          />
           <p className="text-red-600 text-xs">{formik.errors.price}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">stock</label>
          <input
            className="border-2 border-yellow-700"
            type="number"
            name="stock"   
            value={formik.values.stock}    
            onChange={formik.handleChange} 
          />
           <p className="text-red-600 text-xs">{formik.errors.stock}</p>
        </div>
        <div className="w-full flex justify-between">
        <button type="button" onClick={formik.handleReset} className="bg-yellow-300 p-2 hover:font-bold hover:text-yellow-950 ">discard</button>


          <button type="submit" className="bg-yellow-300 p-2 hover:font-bold hover:text-yellow-950 ">Add</button>
        </div>
    </form>
</PureModal>;
    </>
  )
}

export default AddProduct
