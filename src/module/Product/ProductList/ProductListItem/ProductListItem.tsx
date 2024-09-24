import { Button, InputNumber, InputNumberProps, Space } from "antd";
import { IProduct } from "../../../../interface/product";
import style from "./ProductListItem.module.scss";
import { BadgeRussianRuble, ShoppingBasket } from "lucide-react";
import { useCartStore } from "../../../../store/useCartStore";
import { useState } from "react";
import {  tel } from "../../../../api/interseptots";
import ProductItemByIdCarusel from "../../ProductItemById/ProductItemByIdCarusel";
import { Link } from "react-router-dom";

interface Props {
  product: IProduct;
}

export function ProductListItem({ product }: Props) {
  const addCartItem = useCartStore((state) => state.addCartItem);

  const [countInput, setCountInput] = useState<number>(1);
  const onChange: InputNumberProps["onChange"] = (value) => {
    setCountInput(value as number);
  };

  return (
    <>
      <div className={style.productItem} key={product.id}>
      <ProductItemByIdCarusel images={product?.image_src as string[]} video={product?.video_src}/>
        <div className={style.ProductItemInfo}>
        <Link to={`product/${product.id}`} className={style.ProductItemInfoLink}>
        <p className={style.productName}>{product.product_name}</p>
        <p className={style.productPrice}>Цена: {product.price}₽</p>
        <p className={style.productSize}>Размер: {product.size}</p>
        </Link>

        <div className={style.productButton}>
          <a
            className={style.btnProductPay}
            href={`https://wa.me/${tel}?text=Здравствуйте%2C+хочу+купить+${product.product_name}+в+количестве+:${countInput}`}
            target="_blank"
          >
            КУПИТЬ <BadgeRussianRuble className={style.badgeRussianRuble} />
          </a>
          <button
            className={style.btnProductCart}
            onClick={() => addCartItem({ product: product, count: countInput })}
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
    </>
  );
}
