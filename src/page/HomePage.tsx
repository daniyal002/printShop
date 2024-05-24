import { useEffect } from "react";
import { categoryData } from "../hook/categoryHook";
import { productData } from "../hook/productHook";
import { Product } from "../module/Product/Product";
import { useCategoryStore } from "../store/useCategoryStore";
import { useProductStore } from "../store/useProductStore";
import { ICategory } from "../interface/category";
import { IProduct } from "../interface/product";

export function HomePage(){

    const setProducts = useProductStore(state => state.setProducts)
    const {productsData,isSuccess:isSuccessProduct}  = productData()

    useEffect(() => {
        if(productsData){
            setProducts(productsData as IProduct[]);
        }
      }, [productsData,isSuccessProduct]);


      const setCategories  = useCategoryStore(state => state.setCategories);
 
      const {categoriesData,isSuccess} = categoryData()
    
        useEffect(()=>{
            if(categoriesData){
                setCategories(categoriesData as ICategory[])
            }
          },[categoriesData,isSuccess])
    return(<>
        <Product/>
    </>)
}