import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IProduct } from '../../../../interface/product';
import style from './ProductForm.module.scss';
import { Input } from '../../../../components/Input/Input';
import { categoryData } from '../../../../hook/categoryHook';

interface ProductFormProps {
  initialValues?: IProduct;
  onSubmit: (data: IProduct, images: File[], video: File) => void;
  type: "Добавить" | "Изменить";
  isModalOpen: boolean;
}

interface ExtendedFile extends File {
  uid: string;
}


const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, type,isModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IProduct>();

  // const categories = useCategoryStore(state => state.categories);
  const {categoriesData} = categoryData()
  const [fileList, setFileList] = useState<ExtendedFile[]>([]);
  const [videoList, setVideoList] = useState<ExtendedFile | undefined>();

  const handleUploadImagesChange = ({ fileList }: any) => {
    setFileList(fileList.filter((file: any) => file.originFileObj).map((file: any) => file.originFileObj));
  };

  const handleUploadVideoChange = (info: any) => {
    const { fileList } = info;
    if (fileList.length > 0) {
      setVideoList(fileList[fileList.length - 1].originFileObj);
    } else {
      setVideoList(undefined);
    }
  };

  const onFormSubmit = (data: IProduct) => {
    onSubmit(data, fileList, videoList as File);
  };

  // Reset form values when initialValues change
  useEffect(() => {
    if(!initialValues){
      reset({
        product_name:undefined,
        price:undefined,
        size:undefined,
        category_id:undefined,
      })
    }else if(initialValues){
      reset({
        id:initialValues.id,
        product_name:initialValues.product_name,
        price:initialValues.price,
        size:initialValues.size,
        category_id:initialValues.category_id,
      })
    }
  }, [initialValues, reset]);

  useEffect(()=>{
    setFileList([])
    setVideoList(undefined)
    console.log(isModalOpen)
  },[initialValues, reset,isModalOpen])

  return (
    <Form layout="inline" onFinish={handleSubmit(onFormSubmit)} className={style.productForm}>
      <Form.Item>
        <div className={style.productFormItem}>
          <Input label='Продукт' placeholder='Продукт' register={register} registerValue='product_name' type='text' />
          {errors.product_name && <span>{errors.product_name?.message}</span>}
        </div>
      </Form.Item>
      <Form.Item>
        <div className={style.productFormItem}>
          <Input label='Цена' placeholder='Цена' register={register} registerValue='price' type='text' />
          {errors.price && <span>{errors.price?.message}</span>}
        </div>
      </Form.Item>
      <Form.Item>
        <div className={style.productFormItem}>
          <Input label='Размер' placeholder='Размер' register={register} registerValue='size' type='text' />
          {errors.size && <span>{errors.size?.message}</span>}
        </div>
      </Form.Item>
      <Form.Item>
        <div className={style.productFormItem}>
          <label className={style.productFormItemSelectLabel}>Категория</label>
          <select
            {...register('category_id',{valueAsNumber:true})}
            style={{ width: 120 }}
            defaultValue={initialValues?.category_id || ''}
          >
            <option value="" disabled hidden>Категория</option>
            {categoriesData && categoriesData.map(category => (
              <option value={category.id} key={category.id}>{category.category_name}</option>
            ))}
          </select>
        </div>
      </Form.Item>
      <Form.Item>
        <Upload
          multiple
          beforeUpload={() => false}
          onChange={handleUploadImagesChange}
          listType="picture"
          fileList={fileList.map(file => ({
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: file ? URL.createObjectURL(file) : undefined,
          }))}
        >
          <Button icon={<UploadOutlined />}>Загрузить изображения</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Upload
          beforeUpload={() => false}
          onChange={handleUploadVideoChange}
          fileList={videoList ? [{
            uid: 'video',
            name: videoList.name,
            status: 'done',
            url: URL.createObjectURL(videoList),
          }] : []}
          accept="video/*"
        >
          <Button icon={<UploadOutlined />}>Загрузить Видео</Button>
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
