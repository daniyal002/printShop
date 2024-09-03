import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, TableColumnType, InputRef, Input, Space, Typography, InputProps } from 'antd';
import { IProduct } from '../../../../interface/product';
import ProductForm from '../ProductForm/ProductForm';
import useMessage from 'antd/es/message/useMessage';
import style from './ProductList.module.scss';
import { useProductStore } from '../../../../store/useProductStore';
import { addProduct, deleteProduct, uploadProductImages,productData, uploadProductVideo } from '../../../../hook/productHook';
import { useCategoryStore } from '../../../../store/useCategoryStore';
import { categoryData } from '../../../../hook/categoryHook';
import { ICategory } from '../../../../interface/category';
import { baseURL } from '../../../../api/interseptots';
import { ProductFormModal } from '../ProductFormModal/ProductFormModal';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

type DataIndex = keyof IProduct;

const ProductListAdmin: React.FC = () => {
  const { setProducts, products } = useProductStore();

  const { productsData, isSuccess, isLoading } = productData();
  const [messageApi, contextHolder] = useMessage();

  const { mutate: addMutation } = addProduct();
  const { mutate: deleteMutation, errorProduct } = deleteProduct();
  const { mutate: uploadImagesMutation } = uploadProductImages();
  const { mutate: uploadVideoMutation } = uploadProductVideo();
  const setCategories  = useCategoryStore(state => state.setCategories);
 
  const {categoriesData,isSuccess:isSuccessCategory} = categoryData()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>()
  const [pageSize, setPageSize] = useState<Number>(20)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

    useEffect(()=>{
        if(isSuccessCategory){
            setCategories(categoriesData as ICategory[])
        }
      },[categoriesData,isSuccessCategory])

  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: `${errorProduct?.message}`,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setProducts(productsData as IProduct[]);
    }
  }, [isSuccess, productsData]);

  useEffect(() => {
    if (errorProduct) errorMessage();
  }, [errorProduct]);

  const handleAdd = (data: IProduct, images: File[], video: File) => {
    addMutation(data, {
      onSuccess: (newProduct) => {
        if(images.length > 0){
          uploadImagesMutation({ productId: newProduct.id as number, images });
        }

        if(video){
          uploadVideoMutation({productId: newProduct.id as number, video })
        }
    }
    });
  };



  const handleDelete = (id: number) => {
    deleteMutation(id);
  };


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IProduct> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      const fieldValue = record[dataIndex];
      if (fieldValue === undefined || fieldValue === null) {
          return false; // Если поле не определено или равно null, вернуть false
      }
      return fieldValue
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase());
  },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });



  const columns = [
    {
      title: 'Продукт',
      dataIndex: 'product_name',
      key: 'product_name',
      ...getColumnSearchProps('product_name'),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      // sorter: (a:IProduct, b:IProduct) => Number(a.price) - Number(b.price),
      sorter: (a: IProduct, b: IProduct) => a.price.localeCompare(b.price, 'ru'),
    },
    {
        title: 'Размер',
        dataIndex: 'size',
        key: 'size',
      },
      {
        title: 'Изображение',
        key: 'actions',
        render: (record: IProduct) => (
          <div className={style.productListImageRowAction}>
            {record.image_src?.map((src) => (
              <img src={`${baseURL}/uploads/${src}`} alt="" width='50' />
            ))}
          </div>
        ),
      },
    {
      title: 'Действия',
      key: 'actions',
      render: (record: IProduct) => (
        <div className={style.productListRowAction}>
          <Button onClick={() => {setProduct(record); showModal()}}>
            Изменить
          </Button>
          <Button danger onClick={() => handleDelete(record.id as number)}>
            Удалить
          </Button>
        </div>
      ),
    },
  ];  

  const onChangeInput:InputProps['onChange'] = (e) =>{
    if(Number(e.target.value) <= 0){
      setPageSize(10)
    }else{
      setPageSize(Number(e.target.value))
    }
  }

  return (
    <>
      {contextHolder}
      <ProductFormModal isModalOpen={isModalOpen}  handleOk={handleOk} handleCancel={handleCancel} values={product as IProduct}/>
      <div className={style.productPanel}>
        <ProductForm onSubmit={handleAdd} type="Добавить" isModalOpen={isModalOpen}/>
        <Table dataSource={products} columns={columns} loading={isLoading} pagination={{ pageSize: Number(pageSize)}} scroll={{ y: '80vh' }} 
        footer={(_) => (
          <>
            <Typography.Title level={5}>Количество товара в таблице</Typography.Title>
            <Input onChange={onChangeInput} placeholder="10"  style={{width:"100px"}}/>
          </>)}
        />
      </div>
    </>
  );
};

export default ProductListAdmin;