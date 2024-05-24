import React, { useEffect } from 'react';
import { Table, Button } from 'antd';
import { IProduct } from '../../../../interface/product';
import ProductForm from '../ProductForm/ProductForm';
import useMessage from 'antd/es/message/useMessage';
import style from './ProductList.module.scss';
import { useProductStore } from '../../../../store/useProductStore';
import { addProduct, deleteProduct, updateProduct, uploadProductImages,productData } from '../../../../hook/productHook';
import { useCategoryStore } from '../../../../store/useCategoryStore';
import { categoryData } from '../../../../hook/categoryHook';
import { ICategory } from '../../../../interface/category';
import { baseURL } from '../../../../api/interseptots';

const ProductListAdmin: React.FC = () => {
  const { setProducts, products } = useProductStore();

  const { productsData, isSuccess, isLoading } = productData();
  const [messageApi, contextHolder] = useMessage();

  const { mutate: addMutation } = addProduct();
  const { mutate: updateMutation } = updateProduct();
  const { mutate: deleteMutation, errorProduct } = deleteProduct();
  const { mutate: uploadImagesMutation } = uploadProductImages();
  const setCategories  = useCategoryStore(state => state.setCategories);
 
  const {categoriesData,isSuccess:isSuccessCategory} = categoryData()

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

  const handleAdd = (data: IProduct, images: File[]) => {
    addMutation(data, {
      onSuccess: (newProduct) => {
        if(images.length > 0){
          uploadImagesMutation({ productId: newProduct.id as number, images });
        }
    }
    });
  };

  const handleUpdate = (data: IProduct, images: File[]) => {
    updateMutation(data, {
      onSuccess: (updatedProduct) => {
        if(images.length > 0){
          uploadImagesMutation({ productId: updatedProduct.id as number, images });
        }
      }
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation(id);
  };

  const columns = [
    {
      title: 'Продукт',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
        title: 'Размер',
        dataIndex: 'size',
        key: 'size',
      },
      {
        title: 'Actions',
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
      title: 'Actions',
      key: 'actions',
      render: (record: IProduct) => (
        <div className={style.productListRowAction}>
          <ProductForm initialValues={record} onSubmit={handleUpdate} type="Изменить" />
          <Button danger onClick={() => handleDelete(record.id as number)}>
            Удалить
          </Button>
        </div>
      ),
    },
  ];  

  return (
    <>
      {contextHolder}
      <div className={style.productPanel}>
        <ProductForm onSubmit={handleAdd} type="Добавить" />
        <Table dataSource={products} columns={columns} loading={isLoading} pagination={{ pageSize: 10 }} scroll={{ y: '80vh' }} />
      </div>
    </>
  );
};

export default ProductListAdmin;