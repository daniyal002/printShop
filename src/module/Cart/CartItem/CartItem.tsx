import { useEffect, useState } from 'react'
import style from "./CartItem.module.scss"
import { Button, InputNumber,InputNumberProps,Space } from 'antd'
import { ICart } from '../../../interface/cart'
import { useCartStore } from '../../../store/useCartStore'
import { Trash2 } from 'lucide-react'
import { baseURL } from '../../../api/interseptots'

interface Props{
    cart:ICart
}

export function CartItem({cart}:Props){

    const [countInput,setCountInput] = useState<number>(cart.count)
    const updateCartItem = useCartStore(state => state.updateCartItem)
    const deleteCartItem = useCartStore(state => state.deleteCartItem)


    useEffect(()=>{
        updateCartItem(cart.id as number,{count:countInput})
    },[countInput])

    const onChange: InputNumberProps['onChange'] = (value) => {
        updateCartItem(cart.id as number,{count:value as number})
        setCountInput(value as number)
      };

    return(
        <div className={style.cart}>
        <div className={style.cartItem}>
        <div><img src={`${baseURL}/uploads/${cart?.product.image_src?.[0]}`} alt="Кружка 1" width="100" /></div>
        <div className={style.cartInfo}>
            <p className={style.cartInfoProductName}>{cart.product.product_name}</p>
            <p className={style.cartInfoPrice}>{cart.product.price}₽</p>
            <p className={style.cartInfoSize}>{cart.product.size}</p>
            <Space.Compact >
                <Button onClick={() => setCountInput(prev => prev - 1)}>-</Button>
                <InputNumber min={1} defaultValue={cart.count} onChange={onChange} value={countInput} id={style.cartInfoCountInput} />
                <Button onClick={() => setCountInput(prev => prev + 1)}>+</Button>
            </Space.Compact>
        </div>
        <div className={style.cartPrice}>
            <p>{cart.product.price}₽</p>
        </div>
        </div>
        <div>
            <Button type='link' onClick={() => deleteCartItem(cart.id as number)}><Trash2 color="#ff0505" size={40}/></Button>
        </div>
        </div>
    )
}