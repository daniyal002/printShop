import React, { useEffect } from 'react';
import { Table, Button, TableColumnsType } from 'antd';
import { useCategoryStore } from '../../../../store/useCategoryStore';
import CategoryForm from '../CategoryForm/CategoryForm';
import { ICategory } from '../../../../interface/category';
import { addCategory, categoryData, deleteCategory, updateCategory } from '../../../../hook/categoryHook';
import useMessage from 'antd/es/message/useMessage';
import style from "./CategoryList.module.scss"

const CategoryList: React.FC = () => {
  const { setCategories,categories } =
    useCategoryStore();
 
  const {categoriesData,isSuccess,isLoading} = categoryData()
  const [messageApi, contextHolder] = useMessage()

  const {mutate: addMutation} = addCategory();
  const {mutate: updateMutation} = updateCategory();
  const {mutate: deleteMutation,errorCategory} = deleteCategory();

  const errorMessage = () => {
    console.log(errorCategory)
    messageApi.open({
      type: 'error',
      content: `${errorCategory?.message === "Request failed with status code 409" ? "Данная категория привязана к товару" : errorCategory?.message}`,
    });
  };

  useEffect(()=>{
    if(isSuccess){
      setCategories(categoriesData as ICategory[])
    }
  },[isSuccess,categoriesData])

  useEffect(()=>{if(errorCategory)errorMessage()},[errorCategory])

  const handleAdd = (data:ICategory) => {
    addMutation(data.category_name);
  };

  const handleUpdate = (data:ICategory) => {
    updateMutation(data);
  };

  const handleDelete = (id: number) => {
    deleteMutation(id);
  };

  const columns:TableColumnsType<ICategory> = [
    {
      title: 'Категория',
      dataIndex: 'category_name',
      key: 'category_name',
      sorter:false,
    },
    {
      title: 'Изменить',
      key: 'actions',
      render: (record:ICategory) => (
          <div className={style.categoryListRowAction}>
            <CategoryForm initialValues={record} onSubmit={handleUpdate} type='Изменить'/>
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
    <div className={style.categoryPanel}>
      <CategoryForm onSubmit={handleAdd} type='Добавить'/>
      <Table dataSource={categories} columns={columns} loading={isLoading} pagination={{ pageSize: 10}} scroll={{ y: "80vh" }}/>
    </div>
    </>
  );
};

export default CategoryList;