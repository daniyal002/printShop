import style from "./ProductList.module.scss";
import { useEffect, useState } from "react";
import { IProduct } from "../../../interface/product";
import { Input, Select, Pagination } from "antd";
import { SearchProps } from "antd/es/input";
import { ProductListItem } from "./ProductListItem/ProductListItem";
import { productDataFilterByCategoryId } from "../../../hook/productHook";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCartStore } from "../../../store/useCartStore";
import { categoryDataHierarchy } from "../../../hook/categoryHook";
import { ICategory } from "../../../interface/category";

export const ProductList: React.FC = () => {
  const carts = useCartStore((state) => state.carts);
  const params = useParams();
  const { categoriesDataHierarchy } = categoryDataHierarchy();
  const { productsDataFilterByCategoryId } = productDataFilterByCategoryId(
    Number(params.categoryId)
  );

  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Инициализация searchProduct при загрузке данных
  useEffect(() => {
    if (productsDataFilterByCategoryId) {
      setSearchProduct(productsDataFilterByCategoryId);
    }
  }, [productsDataFilterByCategoryId]);

  const { Search } = Input;

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (value) {
      const regex = new RegExp(value.split("").join(".*"), "i");
      setSearchProduct(
        productsDataFilterByCategoryId?.filter((product) =>
          regex.test(product.product_name)
        ) as IProduct[]
      );
    } else {
      setSearchProduct(productsDataFilterByCategoryId as IProduct[]);
    }
    setCurrentPage(1);
  };

  const onChange = (value: string) => {
    if (value) {
      setSearchProduct(
        productsDataFilterByCategoryId?.filter(
          (product) => product.category_id === Number(value)
        ) as IProduct[]
      );
    } else {
      setSearchProduct(productsDataFilterByCategoryId as IProduct[]);
    }
    setCurrentPage(1);
  };

  const [scrollTop, setScrollTop] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsFilterVisible(scrollTop >= 500);
  }, [scrollTop]);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = searchProduct.slice(
    startIndex,
    startIndex + itemsPerPage
  );

 // Фильтрация подкатегорий, относящихся к родительской категории
// Рекурсивная функция для получения всех подкатегорий
const getAllSubcategories = (category: ICategory): { value: string; label: string }[] => {
  const subcategoryOptions = category.subcategories?.flatMap((subcategory) => {
    // Получаем подкатегории текущей подкатегории
    return [
      {
        value: String(subcategory.id),
        label: subcategory.category_name,
      },
      ...getAllSubcategories(subcategory), // Рекурсивный вызов
    ];
  }) || [];

  return subcategoryOptions;
};

// Фильтрация категорий и подкатегорий
const options = categoriesDataHierarchy?.flatMap((category) => {
  // Если текущая категория - родительская для выбранной категории
  if (category.id === Number(params.categoryId)) {
    // Возвращаем родительскую категорию и её подкатегории
    return [
      {
        value: String(category.id),
        label: category.category_name,
      },
      ...getAllSubcategories(category), // Получаем все подкатегории
    ];
  }

  return [];
}) || [];
  return (
      <div className={style.product}>
      <div style={{width:"95%"}}>
        <Search
          placeholder="Введите название товара"
          onSearch={onSearch}
          enterButton
          size="large"
          id={style.searchInput}
        />
        <Select
          showSearch
          allowClear
          placeholder="Каталог"
          optionFilterProp="children"
          onChange={onChange}
          style={{ width: "100%" }}
          filterOption={filterOption}
          options={options}
        />
        <button onClick={() => navigate(-1)} className={style.btnBack}>
        <ArrowLeft size={48} />
      </button>
      </div>
      <div
        className={`${style.productFilter} ${
          isFilterVisible ? style.visible : ""
        }`}
      >
        <Search
          placeholder="Введите название товара"
          onSearch={onSearch}
          enterButton
          size="large"
          id={style.searchInput}
        />
        <div className={style.productFilterColumn}>
          <Select
            showSearch
            placeholder="Каталог"
            optionFilterProp="children"
            style={{ width: "100%" }}
            onChange={onChange}
            filterOption={filterOption}
            options={options}
            allowClear
          />
          <div className={style.headerCart}>
            <button>
              <Link to={`cart`}>
                <ShoppingCart size={45} className={style.shoppingCart} />
                <span>{carts.length}</span>
              </Link>
            </button>
          </div>

        </div>
        <button onClick={() => navigate(-1)} className={style.btnBack2}>
        <ArrowLeft size={48} />
      </button>
      </div>
      <div className={style.productListItem}>
        {paginatedProducts.map((product) => (
          <ProductListItem product={product} key={product.id} />
        ))}
      </div>
      <div className={style.productListPagination}>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={searchProduct.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>

  );
};
