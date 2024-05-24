import { BadgeRussianRuble } from 'lucide-react'
import { useCartStore } from '../../../store/useCartStore'
import style from './CartTotal.module.scss'



export function CartTotal(){
    const total = useCartStore(state => state.total)
    const carts = useCartStore(state => state.carts)

    const readableCarts = carts.map(cart => ({
        Товар: cart.product.product_name,
        Цена: cart.product.price,
        Размер: cart.product.size,
        Количество: cart.count
    }));

    return(
        <div className={style.totalContainer}>
            <div className={style.total}>
                <p>Общая сумма: <span>{total()}₽</span></p>
                <p>Количество товаров: <span>{carts.length}</span></p>
                <a className={style.btnProductPay} href={`https://wa.me/79282501420?text=Здравствуйте%2C+хочу+купить+${JSON.stringify(readableCarts, null, 2)}%2C+Общая+сумма:+${total()}%2C+Количество+товаров:+${carts.length}`}>КУПИТЬ <BadgeRussianRuble className={style.badgeRussianRuble}/></a>
            </div>
        </div>
    )
}