import { useEffect, useState } from "react";
import { useCartStore } from "../../store/useCartStore";
import { CartItem } from "./CartItem/CartItem";
import style from "./Cart.module.scss";
import { CartTotal } from "./CartTotal/CartTotal";
import { CartTotalModal } from "./CartTotalModal/CartTotalModal";
import { ArrowLeft, BadgeRussianRuble } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const carts = useCartStore((state) => state.carts);
  const setCarts = useCartStore((state) => state.setCarts);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCarts = localStorage.getItem("carts");
    setCarts(JSON.parse(updateCarts as string));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.cart}>
      <div className="containerCart">
        <button onClick={() => navigate(-1)} className={style.btnBack}>
          <ArrowLeft size={48} />
        </button>

        <div className={style.container}>
          <div className={style.cartItem}>
            {carts &&
              carts.map((cart) => <CartItem cart={cart} key={cart.id} />)}
          </div>
          <CartTotal />
          <CartTotalModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
          <a className={style.btnProductPay} onClick={showModal}>
            КУПИТЬ <BadgeRussianRuble className={style.badgeRussianRuble} />
          </a>
        </div>
      </div>
    </div>
  );
}
