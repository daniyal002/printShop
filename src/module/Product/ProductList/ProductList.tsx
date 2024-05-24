import { useProductStore } from "../../../store/useProductStore"
import style from './ProductList.module.scss'
import { useEffect, useState } from "react"
import { IProduct } from "../../../interface/product"
import { Input, Select} from "antd"
import { SearchProps } from "antd/es/input"
import { ProductListItem } from "./ProductListItem/ProductListItem"
import { productData } from "../../../hook/productHook"
import { useCategoryStore } from "../../../store/useCategoryStore"




export const ProductList: React.FC = () => {
    const products = useProductStore(state => state.products);
    const categories = useCategoryStore(state => state.categories)
    const setProducts = useProductStore(state => state.setProducts);
  
    const { isSuccess, productsData } = productData();
  
    // Инициируем searchProduct как пустой массив
    const [searchProduct, setSearchProduct] = useState<IProduct[]>([]);
  
    useEffect(() => {
      if (isSuccess) {
        setProducts(productsData as IProduct[]);
        setSearchProduct(productsData as IProduct[]); // Убедимся, что мы инициализируем searchProduct продуктами напрямую
      }
    }, [isSuccess, productsData, setProducts]);
  
    const { Search } = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e) => {
      if (value !== "") {
        const regex = new RegExp(value.split('').join('.*'), 'i');
        setSearchProduct(products.filter((product) => regex.test(product.product_name)));
      } else {
        setSearchProduct(products);
      }
    };
    
    const onChange = (value: string) => {
        setSearchProduct(products.filter((product)=>product.category_id === Number(value)))
      };
      
      

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
      <div className={style.product}>
        <div>
            <Search
            placeholder="Введите название товара"
            onSearch={onSearch}
            enterButton
            size="large"
            id={style.searchInput}
            />
            <Select
            showSearch
            placeholder="Категория"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            options={categories.map(category => ({value:category.id?.toString() as string, label:category.category_name}))}
            />
        </div>
        
        <div className={style.productList}>
          {searchProduct.map((product) => (
            <ProductListItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    );
  };
  