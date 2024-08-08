import { Button, InputNumber, InputNumberProps, Space } from "antd";
import { useCartStore } from "../../../store/useCartStore";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BadgeRussianRuble, ShoppingBasket } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from './ProductItemById.module.scss';
import { getProductById } from "../../../hook/productHook";
import { useState } from "react";
import { baseURL, tel } from "../../../api/interseptots";

// Конфигурация слайдера

export function ProductItemById() {
    
  const addCartItem = useCartStore(state => state.addCartItem);
  const [countInput, setCountInput] = useState<number>(1);
  const onChange: InputNumberProps['onChange'] = (value) => {
    setCountInput(value as number);
  };
  const params = useParams();
  const { productData } = getProductById(Number(params.id));
  if (!productData) {
    return (<><h1>Нет такого товара</h1></>);
  }

  const settings = {
    dots: true,
    infinity:true,
    autoplay: true,
    centerMode: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "30px",
    appendDots: (dots:any) => (
      <div
        style={{
          padding: "10px 0"
        }}
      >
        <ul style={{ margin: "20px auto" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i:number) => (
      <div
        style={{
          width: "30px",
          color: "blue",
          border: "2px solid #b2ffd0",
        }}
      >
        {i + 1}
      </div>
    )
  };


  return (
    <div className="containerPostItem">
        <Link to={'/'} className={style.btnBack}><ArrowLeft size={48} /> назад</Link>
        <div className={style.slider}>
          {productData.image_src && productData?.image_src?.length >= 2 ? (
            <Slider {...settings}>
            {productData.image_src?.map((src, index) => (
              <div key={index} className={style.sliderImage}>
                <img
                  src={`${baseURL}/uploads/${src}`}
                  alt={`${productData.product_name} ${index + 1}`}
                  width="250"
                  className={style.responsiveImage}
                />
              </div>
            ))}
          </Slider> 
          ) : (
            <img
                  src={`${baseURL}/uploads/${productData.image_src && productData?.image_src[0]}`}
                  alt={`${productData.product_name}`}
                  width="250"
                  className={style.responsiveImage}
                />
          ) }
       
        </div>
      <div className={style.productItem}>
        
         
         <p className={style.productName}>{productData.product_name}</p>
        <p className={style.productPrice}>Цена: {productData.price}₽</p>
        <p className={style.productSize}>Размер: {productData.size}</p>
        <div className={style.productButton}>
          <a className={style.btnProductPay} href={`https://wa.me/${tel}?text=Здравствуйте%2C+хочу+купить+${productData.product_name}`}>
            КУПИТЬ <BadgeRussianRuble className={style.badgeRussianRuble} />
          </a>
          <button className={style.btnProductCart} onClick={() => addCartItem({ product: productData, count: countInput })}>
            В корзину <ShoppingBasket className={style.shoppingBasket} />
          </button>
          <Space.Compact>
            <Button onClick={() => setCountInput(prev => prev - 1)}>-</Button>
            <InputNumber min={1} defaultValue={countInput} onChange={onChange} value={countInput} />
            <Button onClick={() => setCountInput(prev => prev + 1)}>+</Button>
          </Space.Compact>
        </div>
      </div>
    </div>
  );
}