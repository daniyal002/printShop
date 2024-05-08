import { useProductStore } from "../../../store/useProductStore"
import style from './ProductList.module.scss'
import cup from '../../../assets/img/cup.jpg'
import { BadgeRussianRuble, ShoppingBasket } from "lucide-react"
import { useState } from "react"
import { IProduct } from "../../../interface/product"
import { Input } from "antd"
import { SearchProps } from "antd/es/input"
import { useCartStore } from "../../../store/useCartStore"

export function ProductList(){

  const { Search } = Input;


    const products = useProductStore(state => state.products)
    const [searchProduct, setSearchProduct] = useState<IProduct[]>(products)
   

    const onSearch: SearchProps['onSearch'] = (value, _e) => {
        if (value !== "") {
            const regex = new RegExp(value.split('').join('.*'), 'i');
            console.log(searchProduct)
            setSearchProduct(products.filter((product) => regex.test(product.productName)))
        } else {
            setSearchProduct(products)
        }
      };

      const addCartItem = useCartStore(state => state.addCartItem);

    return(
        <div className={style.product}>
        <Search placeholder="Введите название товара" onSearch={onSearch} enterButton  size="large" id={style.searchInput}/>
        <div className={style.productList}>
            {searchProduct.map((product => (
                <div className={style.productItem} key={product.id}>
                    <img src={cup} alt={product.productName} width="250"/>
                    <p className={style.productName}>{product.productName}</p>
                    <p className={style.productPrice}>Цена: {product.price}₽</p>
                    <p className={style.productSize}>Размер: {product.size}</p>
                    <a className={style.btnProductPay} href={`https://wa.me/79282501420?text=Здравствуйте%2C+хочу+купить+${product.productName}`}>КУПИТЬ <BadgeRussianRuble className={style.badgeRussianRuble}/></a>
                    <button className={style.btnProductCart} onClick={() => addCartItem({product:product,count:1})}>В корзину <ShoppingBasket className={style.shoppingBasket}/></button>
                </div>
            )))}
        </div>
        </div>

    )
}