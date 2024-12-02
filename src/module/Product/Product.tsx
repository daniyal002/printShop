import style from './Product.module.scss'
import CategoryList from "./CategoryList/CategoryList";


export function Product(){

    return(
        <div className={style.product}>
            <div className="container">
                <CategoryList/>
            </div>
        </div>
    )
}