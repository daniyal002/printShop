import { Button, Modal } from "antd";
import { useCartStore } from "../../../store/useCartStore";
import style from './CartTotalModal.module.scss'
import { BadgeRussianRuble } from "lucide-react";
import { tel } from "../../../api/interseptots";

interface Props{
    isModalOpen:boolean,
    handleOk:any
    handleCancel:any
    
}

export function CartTotalModal({isModalOpen,handleOk,handleCancel}:Props){
    const carts = useCartStore(state => state.carts)
    const total = useCartStore(state => state.total)
  
    const readableCarts = carts.map(cart => ({
        Товар: cart.product.product_name,
        Количество: cart.count
    }));
    
        const totalCount = carts.reduce((sum,current) => sum + current.count,0 )
        const message = readableCarts.map(cart => 
            Object.values(cart).join(', ')
        ).join('; ');
    return(
        <Modal title="Итоги" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={() => (
            <>
              <Button onClick={handleCancel} id={style.modalCloseBtn} type="primary">Закрыть</Button>
            </>
          )}>
             <div className={style.total}>
            <p>Общая сумма: <span>{total()}</span></p>
            <p>Количество товаров: <span>{totalCount}</span></p>
            <a className={style.btnProductPay} href={`https://wa.me/${tel}?text=Здравствуйте%2C+хочу+купить+${message}%2C+Общая+сумма:+${total()}%2C+Количество+товаров:+${totalCount}`} target="_blank">КУПИТЬ <BadgeRussianRuble className={style.badgeRussianRuble}/></a>
        </div>
      </Modal>
    )
}