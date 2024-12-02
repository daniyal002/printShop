import { Link } from "react-router-dom"
import { baseURL } from "../../../api/interseptots"
import { categoryData } from "../../../hook/categoryHook"
import style from './CategoryList.module.scss'

export default function CategoryList() {
    const {categoriesData} = categoryData()

  return (
    <div className={style.categoryList}>{categoriesData?.filter(category => category.parent_id == null).map(category => (
        <div key={category.id} className={style.categoryItem}>
            <h2 className={style.categoryItemHeader}>{category.category_name}</h2>
            {category.image_url && (
                <img className={style.categoryItemImage} src={`${baseURL}/uploads/${category.image_url}`} alt={category.image_url}  />
            )}
            <Link to={`product/${category.id}`} className={style.categoryItemLink}>Перейти</Link>
        </div>
    ))}</div>
  )
}
