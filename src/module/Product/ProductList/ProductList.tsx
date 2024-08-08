import { useProductStore } from "../../../store/useProductStore";
import style from "./ProductList.module.scss";
import { useEffect, useState } from "react";
import { IProduct } from "../../../interface/product";
import { Input, Select, Pagination } from "antd";
import { SearchProps } from "antd/es/input";
import { ProductListItem } from "./ProductListItem/ProductListItem";
import { productData } from "../../../hook/productHook";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../../store/useCartStore";

export const ProductList: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const categories = useCategoryStore((state) => state.categories);
  const setProducts = useProductStore((state) => state.setProducts);
  const carts = useCartStore((state) => state.carts);

  const { isSuccess, productsData } = productData();

  // Инициируем searchProduct как пустой массив
  const [searchProduct, setSearchProduct] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (isSuccess) {
      setProducts(productsData as IProduct[]);
      setSearchProduct(productsData as IProduct[]);
    }
  }, [isSuccess, productsData, setProducts]);

  const { Search } = Input;
  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    if (value !== "") {
      const regex = new RegExp(value.split("").join(".*"), "i");
      setSearchProduct(
        products.filter((product) => regex.test(product.product_name))
      );
    } else {
      setSearchProduct(products);
    }
    setCurrentPage(1);
  };

  const onChange = (value: string) => {
    setSearchProduct(
      products.filter((product) => product.category_id === Number(value))
    );
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
    scrollTop >= 500 ? setIsFilterVisible(true) : setIsFilterVisible(false);
  }, [scrollTop]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = searchProduct.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
          options={categories.map((category) => ({
            value: category.id?.toString() as string,
            label: category.category_name,
          }))}
        />
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
            placeholder="Категория"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            options={categories.map((category) => ({
              value: category.id?.toString() as string,
              label: category.category_name,
            }))}
          />
          <div className={style.headerCart}>
            <button>
              <Link to={`cart`}>
                <ShoppingCart size={45} className={style.shoppingCart} />{" "}
                <span>{carts.length}</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className={style.productList}>
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
