import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
export const ProductsContext = createContext({
  products:null,
  getAllProducts:()=>{},
  isLoading:true,
  origins:null,
  isLoadingOrigins:true,
  categories:null,
  isLoadingCategories:true
})

export const ProductsProvider = (props) => {
    const [products, setProducts] = useState( null);
    const [isLoading,setIsLoading]=useState(true);
    const [origins, setOrigins] = useState( null);
    const [isLoadingOrigins,setIsLoadingOrigins]=useState(true);
    const [categories, setCategories] = useState( null);
    const [isLoadingCategories,setIsLoadingCategories]=useState(true);
    
    const getAllProducts=async ()=>{
      axios.get('http://localhost:8000/products').then(
        res=>{
          setProducts(res.data)
          setIsLoading(false);
        }
      ).catch(err=>{
        console.log(err);
      })
    }
    const getUniqueOrigins=async()=>{
      axios.get('http://localhost:8000/products/unique-origins').then(
        res=>{
          setOrigins(res.data.origins);
          setIsLoadingOrigins(false);
        }
      ).catch(
       err=> console.log(err)
      )
    }
  
    const getProductsCategories=async()=>{
      axios.get('http://localhost:8000/products/products-categories').then(
        res=>{
          setCategories(res.data.productsCategories);
          setIsLoadingCategories(false);
        }
      ).catch(
       err=> console.log(err)
      )
    }

    useEffect(() => {
        getAllProducts();
        getUniqueOrigins();
        getProductsCategories();
    }, [])
  
    return <ProductsContext.Provider value={{ products,isLoading,origins,isLoadingOrigins,categories,isLoadingCategories}}>{props.children}</ProductsContext.Provider>
  }
  