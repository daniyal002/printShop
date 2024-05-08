import { Button, Modal } from "antd";
import { useCartStore } from "../../../store/useCartStore";
import style from './CartTotalModal.module.scss'
import { BadgeRussianRuble } from "lucide-react";

interface Props{
    isModalOpen:boolean,
    handleOk:any
    handleCancel:any
    
}

export function CartTotalModal({isModalOpen,handleOk,handleCancel}:Props){
    const carts = useCartStore(state => state.carts)
    const total = useCartStore(state => state.total)
  
    const readableCarts = carts.map(cart => ({
            Товар: cart.product.productName,
            Цена: cart.product.price,
            Размер: cart.product.size,
            Количество: cart.count
        }));

    return(
        <Modal title="Итоги" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={() => (
            <>
              <Button onClick={handleCancel} id={style.modalCloseBtn} type="primary">Закрыть</Button>
            </>
          )}>
             <div className={style.total}>
            <p>Общая сумма: <span>{total()}</span></p>
            <p>Количество товаров: <span>{carts.length}</span></p>
            <a className={style.btnProductPay} href={`https://wa.me/79282501420?text=Здравствуйте%2C+хочу+купить+${JSON.stringify(readableCarts, null, 2)}%2C+Общая+сумма:+${total()}%2C+Количество+товаров:+${carts.length}`}>КУПИТЬ <BadgeRussianRuble className={style.badgeRussianRuble}/></a>
        </div>
      </Modal>
    )
}