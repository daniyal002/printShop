import React, { useEffect } from 'react';
import { Table, TableColumnsType } from 'antd';
import CategoryForm from '../CategoryForm/CategoryForm';
import { ICategory } from '../../../../interface/category';
import { addCategory, categoryData, deleteCategory, updateCategory } from '../../../../hook/categoryHook';
import useMessage from 'antd/es/message/useMessage';
import style from "./CategoryList.module.scss"
import { baseURL } from '../../../../api/interseptots';

const CategoryList: React.FC = () => {

  const {categoriesData,isLoading} = categoryData()
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



  useEffect(()=>{if(errorCategory)errorMessage()},[errorCategory])

    const handleAdd = (data: { category: ICategory; file?: File }) => {
      addMutation(data); // передаем объект с данными категории и файлом
    };

    const handleUpdate = (data: { category: ICategory; file?: File }) => {
      updateMutation(data); // передаем объект с данными категории и файлом (если есть)
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
      title: 'Изображение',
      key: 'image_url',
      render: (record:ICategory) => (
        <>
        {record.image_url ? (
        <img src={`${baseURL}/uploads/${record.image_url}`} alt={record.category_name} width={100}/>
        ) : (
          <p>Нет изображения</p>
        )}
        </>
      )

    },
    {
      title: 'Действия',
      key: 'actions',
      render: (record:ICategory) => (
          <div className={style.categoryListRowAction}>
            <CategoryForm initialValues={record} onSubmit={handleUpdate} type='Изменить' allCategory={categoriesData as ICategory[]}/>
            <button  className={style.categoryListRowActionDelete} onClick={() => handleDelete(record.id as number)}>
              Удалить
            </button>
          </div>
      ),
    },
  ];

  return (
    <>
    {contextHolder}
    <div className={style.categoryPanel}>
      <CategoryForm onSubmit={handleAdd} type='Добавить' allCategory={categoriesData as ICategory[]}/>
      <Table dataSource={categoriesData} columns={columns} loading={isLoading} pagination={{ pageSize: 10}} scroll={{ y: "80vh" }}/>
    </div>
    </>
  );
};

export default CategoryList;