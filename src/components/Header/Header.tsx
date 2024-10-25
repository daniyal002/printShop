import { Link, Outlet } from 'react-router-dom';
import style from './Header.module.scss'
import { ShoppingCart, Warehouse } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { tel } from '../../api/interseptots';

export function Header(){
    const carts = useCartStore(state => state.carts)
    const formatPhoneNumber = (phoneNumber: string) => {
        const formattedPhoneNumber = `+7 (${phoneNumber.slice(1, 4)})-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
        return formattedPhoneNumber;
      };
      const formattedTel = formatPhoneNumber(tel);

    return(
        <header className={style.header}>
            <div className="container">
            <div className={style.headerContainer}>
                    <div className={style.headerLogo}>
                        <span><Link to={`/`}>Фабрика кружек</Link></span>
                        <p className={style.phoneInfo}>Нажмите на номер чтобы перейти на WhatsAap</p>
                        <p><a href={`https://wa.me/${tel}`}>{formattedTel}</a></p>
                    </div>
                    <div className={style.headerIcon}>
                    <div className={style.headerCart}>
                        <button><Link to={`cart`}><ShoppingCart size={40} className={style.shoppingCart}/> <span>{carts.length}</span></Link></button>
                    </div>
                    <div className={style.headerCart}>
                        <button><Link to={`login`}><Warehouse size={43} /></Link></button>
                    </div>
                    </div>
                    <Outlet />
            </div>
            </div>
        </header>
    )
}