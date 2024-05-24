import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IProduct } from '../../../../interface/product';
import style from './ProductForm.module.scss';
import { useCategoryStore } from '../../../../store/useCategoryStore';
import { Input } from '../../../../components/Input/Input';

interface ProductFormProps {
  initialValues?: IProduct;
  onSubmit: (data: IProduct, images: File[]) => void;
  type: "Добавить" | "Изменить";
}
interface ExtendedFile extends File {
  uid: string;
}

const schema = yup.object().shape({
  product_name: yup.string().required('Поле продукт обязательное'),
  price: yup.string().required('Поле цена обязательное'),
  size: yup.string().required('Поле размер обязательное'),
  category_id: yup.number().required('Поле категория обязательное'),
});

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues || { product_name: '', price: "" , size: "", category_id: 0},
  });

  const categories = useCategoryStore(state => state.categories)
  const [fileList, setFileList] = useState<ExtendedFile[]>([]);

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList.map((file:any) => file.originFileObj)); // Ensure the file objects are passed
  };

  const onFormSubmit = (data: IProduct) => {
    onSubmit(data, fileList);
    console.log("fileList",fileList)
  };

  return (
    <Form layout="inline" onFinish={handleSubmit(onFormSubmit)} className={style.productForm}>
      <Form.Item >
        <div className={style.productFormItem}>
            <Input label='Продукт' placeholder='Продукт' register={register} registerValue='product_name' type='text'/>
            {errors.product_name && <span>{errors.product_name?.message}</span>}
        </div>
      </Form.Item>
      <Form.Item>
        <div className={style.productFormItem}>
            <Input label='Цена' placeholder='Цена' register={register} registerValue='price' type='text'/>
            {errors.price && <span>{errors.price?.message}</span>}
        </div>
      </Form.Item>
      <Form.Item>
        <div className={style.productFormItem}>
            <Input label='Размер' placeholder='Размер' register={register} registerValue='size' type='text'/>
            {errors.size && <span>{errors.size?.message}</span>}
        </div>
      </Form.Item>
      <Form.Item >
        <div className={style.productFormItem}>
            <label className={style.productFormItemSelectLabel}>Категория</label>
            <select
            {...register('category_id')}
            style={{ width: 120 }}
            defaultValue={initialValues?.category_id}
            >
                <option value="" disabled selected hidden className={style.placeholderOption}>Категория</option>
                {categories.map(category => (
                    <option value={category.id} key={category.id}>{category.category_name}</option>
                ))}
            </select>
        </div>
      </Form.Item>
      <Form.Item>
      <Upload 
          multiple 
          beforeUpload={() => false} // Prevent auto upload
          onChange={handleUploadChange}
          fileList={fileList.map(file => ({
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: URL.createObjectURL(file),
          })) as any}
        >
          <Button icon={<UploadOutlined />}>Загрузить изображения</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {type}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;