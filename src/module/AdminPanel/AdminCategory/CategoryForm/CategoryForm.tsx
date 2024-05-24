import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ICategory } from '../../../../interface/category';
import style from './CategoryForm.module.scss'

interface CategoryFormProps {
  initialValues?: { id?: number; category_name: string };
  onSubmit: (data: ICategory) => void;
  type: "Добавить" | "Изменить"
}

const schema = yup.object().shape({
  category_name: yup.string().required('Поле категория обязательное'),
});

const CategoryForm: React.FC<CategoryFormProps> = ({ initialValues, onSubmit,type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues || { category_name: '' },
  });


  return (
    <Form layout="inline" onFinish={handleSubmit(onSubmit)}>
      <Form.Item>
        <input className={style.categoryFormInput} {...register('category_name')} placeholder="Категория" />
        {errors.category_name && <span>{errors.root?.message}</span>}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {type}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
