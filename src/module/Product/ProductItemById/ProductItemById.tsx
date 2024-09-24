import { Button, InputNumber, InputNumberProps, Space } from "antd";
import { useCartStore } from "../../../store/useCartStore";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BadgeRussianRuble, ShoppingBasket } from "lucide-react";
import style from "./ProductItemById.module.scss";
import { getProductById } from "../../../hook/productHook";
import { useState } from "react";
import {  tel } from "../../../api/interseptots";
import ProductItemByIdCarusel from "./ProductItemByIdCarusel";

// Конфигурация слайдера

export function ProductItemById() {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const [countInput, setCountInput] = useState<number>(1);
  const onChange: InputNumberProps["onChange"] = (value) => {
    setCountInput(value as number);
  };
  const params = useParams();
  const { productData } = getProductById(Number(params.id));
  if (!productData) {
    return (
      <>
        <h1>Нет такого товара</h1>
      </>
    );
  }

  return (
    <div className="containerPostItem">
      <Link to={"/"} className={style.btnBack}>
        <ArrowLeft size={48} /> назад
      </Link>

      <ProductItemByIdCarusel images={productData?.image_src as string[]} video={productData?.video_src as string}/>
      
      <div className={style.productItem}>
        <p className={style.productName}>{productData.product_name}</p>
        <p className={style.productPrice}>Цена: {productData.price}₽</p>
        <p className={style.productSize}>Размер: {productData.size}</p>
        <div className={style.productButton}>
          <a
            className={style.btnProductPay}
            href={`https://wa.me/${tel}?text=Здравствуйте%2C+хочу+купить+${productData.product_name}`}
          >
            КУПИТЬ <BadgeRussianRuble className={style.badgeRussianRuble} />
          </a>
          <button
            className={style.btnProductCart}
            onClick={() =>
              addCartItem({ product: productData, count: countInput })
            }
          >
            В корзину <ShoppingBasket className={style.shoppingBasket} />
          </button>
          <Space.Compact>
            <Button onClick={() => setCountInput((prev) => prev - 1)}>-</Button>
            <InputNumber
              min={1}
              defaultValue={countInput}
              onChange={onChange}
              value={countInput}
            />
            <Button onClick={() => setCountInput((prev) => prev + 1)}>+</Button>
          </Space.Compact>
        </div>
      </div>
    </div>
  );
}
