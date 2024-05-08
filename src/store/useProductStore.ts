import { create } from "zustand"
import { IProduct } from "../interface/product"

interface IProductStore{
    products:IProduct[]
    addProduct: (product:IProduct) => void
}

export const useProductStore = create<IProductStore>((set)=>({
    products:[
        {
            id:1,
            productName:"Кружка 1",
            price:"1000",
            size:"10х10",
        },
        {
            id:2,
            productName:"Кружка 2",
            price:"500",
            size:"20х20",
        },
        {
            id:3,
            productName:"Кружка 3",
            price:"1300",
            size:"10х10",
        },
        {
            id:4,
            productName:"Кружка 4",
            price:"1000",
            size:"10х10",
        },
        {
            id:5,
            productName:"Кружка 5",
            price:"5000",
            size:"10х10",
        },
        {
            id:6,
            productName:"Кружка 6",
            price:"100",
            size:"10х10",
        }
    ],

    addProduct: (product) => {
        set((state) => ({products: [...state.products, product] }))
    }
}))