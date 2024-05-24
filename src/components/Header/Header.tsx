import { Link, Outlet } from 'react-router-dom';
import style from './Header.module.scss'
import { ShoppingCart, Warehouse } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export function Header(){
    const carts = useCartStore(state => state.carts)

    return(
        <header className={style.header}>
            <div className="container">
            <div className={style.headerContainer}>
                    <div className={style.headerLogo}>
                        <span><Link to={`/`}>Фабрика кружек</Link></span>
                    </div>
                    <div className={style.headerIcon}>
                    <div className={style.headerCart}>
                        <button><Link to={`cart`}><ShoppingCart size={45} className={style.shoppingCart}/> <span>{carts.length}</span></Link></button>
                    </div>
                    <div className={style.headerCart}>
                        <button><Link to={`login`}><Warehouse size={48} /></Link></button>
                    </div>
                    </div>
                    <Outlet />
            </div>
            </div>
        </header>
    )
}