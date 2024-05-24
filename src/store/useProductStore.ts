import { create } from "zustand"
import { IProduct } from "../interface/product"

interface IProductStore{
    products:IProduct[]
    setProducts: (categories: IProduct[]) => void;
    addProduct: (product:IProduct) => void
    updateProduct: (product: IProduct) => void;
    removeProduct: (id: number) => void;
}

export const useProductStore = create<IProductStore>((set)=>({
    products:[
    ],
    setProducts: (products) => set({ products: products }),
    addProduct: (product) => {
        set((state) => ({products: [...state.products, product] }))
    },
    updateProduct: (product) =>
        set((state) => ({
            products: state.products.map((p) =>
                p.id === product.id ? product : p,
          ),
        })),
        removeProduct: (id) =>
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        })),
    }))