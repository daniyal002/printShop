import { create } from "zustand"
import { ICart } from "../interface/cart"

interface ICartStore{
    carts:ICart[];
    setCarts: (carts:ICart[]) => void
        addCartItem: (cartItem:ICart) => void
    updateCartItem: (id:number,updateCartItem:Partial<ICart>) => void
    deleteCartItem: (id:number) => void
    total: () => number
}

export const useCartStore = create<ICartStore>((set,get)=>({
    carts:[],

    setCarts: (carts) => {
        set({carts:carts})
    },
    addCartItem: (cartItem) => {
        const currentCarts = get().carts || [];
        let newId;
        if (currentCarts !== undefined && currentCarts.length > 0) {
            newId = currentCarts.reduce((maxId, cartItem) => Math.max(maxId, cartItem.id as number), 0) + 1;
        } else {
            newId = 1;
        }

         let isProductInCarts = false
         let isProductInCartsId = cartItem.id 
         let isProductInCartsCount = 0 
         currentCarts.forEach(item => {
            if(item.product.id === cartItem.product.id){
                isProductInCarts = true
                isProductInCartsId = item.id
                isProductInCartsCount = item.count
            }
        }) 

        if(isProductInCarts){
            get().updateCartItem(isProductInCartsId as number,{id:isProductInCartsId, product:cartItem.product, count:isProductInCartsCount + cartItem.count})
        }else{
            set({carts:[...currentCarts, {id:newId,product:cartItem.product,count:cartItem.count}]})
            localStorage.setItem("carts",JSON.stringify(get().carts))

        }

    },

    updateCartItem:(id, updateCartItem) => {
        set((state) => ({
            carts: state.carts.map((cart) =>
                cart.id === id ? { ...cart, ...updateCartItem } : cart
            )
        }))
        localStorage.setItem("carts",JSON.stringify(get().carts))
    },

    deleteCartItem:(id) => {
        set({carts:get().carts.filter(cart => cart.id !== id)})
        localStorage.setItem("carts",JSON.stringify(get().carts))
    },

    total:() =>{
        return get().carts.reduce((sum,current) => sum + (current.count * Number(current.product.price)),0)
    },

}))