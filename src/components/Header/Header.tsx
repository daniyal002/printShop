import { Link, Outlet } from 'react-router-dom';
import style from './Header.module.scss'
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export function Header(){
    const carts = useCartStore(state => state.carts)

    return(
        <header className={style.header}>
            <div className="container">
            <div className={style.headerContainer}>
                    <div className={style.headerLogo}>
                        <span><Link to={`/`}>PrintShop</Link></span>
                    </div>
                    <div className={style.headerCart}>
                        <button><Link to={`cart`}><ShoppingCart size={45} className={style.shoppingCart}/> <span>{carts.length}</span></Link></button>
                    </div>
                    <Outlet />
            </div>
            </div>
        </header>
    )
}