import { ProductList } from "./ProductList/ProductList";
import style from './Product.module.scss'

export function Product(){
    return(
        <div className={style.product}>
            <div className="container">
                <ProductList/>
            </div>
        </div>
    )
}