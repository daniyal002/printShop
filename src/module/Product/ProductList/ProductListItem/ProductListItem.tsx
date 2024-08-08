import { Button, InputNumber, InputNumberProps, Space } from "antd";
import { IProduct } from "../../../../interface/product";
import style from "./ProductListItem.module.scss";
import { BadgeRussianRuble, ShoppingBasket } from "lucide-react";
import { useCartStore } from "../../../../store/useCartStore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { baseURL, tel } from "../../../../api/interseptots";
import LazyImage from "../../../../components/LazyImage/LazyImage";

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
        <Link to={`product/${product.id}`}>
        <LazyImage 
            src={`${baseURL}/uploads/${product.image_src?.[0]}`} 
            alt={product.product_name} 
            width={250} 
            className={style.responsiveImage} 
            srcSet={`${baseURL}/uploads/${product.image_src?.[0]} 800w, ${baseURL}/uploads/${product.image_src?.[0]} 400w`} // Assuming the CDN handles resizing
            sizes="(max-width: 600px) 400px, 800px"
          />
        </Link>
        <p className={style.productName}>{product.product_name}</p>
        <p className={style.productPrice}>Цена: {product.price}₽</p>
        <p className={style.productSize}>Размер: {product.size}</p>
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
    </>
  );
}
