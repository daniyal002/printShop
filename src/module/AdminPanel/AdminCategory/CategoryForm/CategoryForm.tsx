import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Select, Upload } from "antd";
import { ICategory } from "../../../../interface/category";
import { UploadOutlined } from "@ant-design/icons"; // Импортируем иконку для загрузки
import style from "./CategoryForm.module.scss";

interface CategoryFormProps {
  initialValues?: ICategory;
  onSubmit: (data: { category: ICategory; file?: File }) => void; // Обновляем тип onSubmit
  type: "Добавить" | "Изменить";
  allCategory: ICategory[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialValues,
  onSubmit,
  type,
  allCategory,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICategory>({
    defaultValues: initialValues || { category_name: "" },
  });

  const [file, setFile] = React.useState<File | null>(null); // Состояние для файла
  const [imageUrl, setImageUrl] = React.useState<string | null>(null); // Состояние для URL изображения

  const handleFileChange = (info: any) => {
    if (info.fileList.length > 0) {
      const selectedFile = info.fileList[0].originFileObj as File; // Получаем файл
      setFile(selectedFile); // Сохраняем выбранный файл
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string); // Устанавливаем URL изображения
      };
      reader.readAsDataURL(selectedFile); // Читаем файл как URL
    } else {
      setFile(null); // Если файл удален, сбрасываем состояние
      setImageUrl(null); // Сбрасываем URL изображения
    }
  };

  return (
    <>
      <Form
        layout="inline"
        onFinish={handleSubmit((data) =>
          onSubmit({ category: data, file: file ? file : undefined })
        )}
        style={{ alignItems: "flex-end", rowGap: "20px" }}
      >
        <Form.Item>
          <div className={style.formItem}>
            <label>Название категории:</label>
            <input
              className={style.categoryFormInput}
              {...register("category_name", {
                required: {
                  message: "Категория обязательное поле",
                  value: true,
                },
              })}
              placeholder="Категория"
            />
            {errors.category_name && (
              <span className={style.formItemError}>
                {errors.category_name?.message}
              </span>
            )}
          </div>
        </Form.Item>
        <Form.Item>
          <div className={style.formItem}>
            <label>Родитель:</label>
            <Select
              {...register("parent_id")}
              className={style.categoryParentSelect}
              style={{ width: "100%" }}
              defaultValue={initialValues?.parent_id || ""}
              onChange={(value) => {
                setValue("parent_id", value as number);
              }}
            >
              <Select.Option value="">Нет родителя</Select.Option>
              {allCategory?.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.category_name}
                </Select.Option>
              ))}
            </Select>
            {errors.parent_id && (
              <span className={style.formItemError}>
                {errors.parent_id?.message}
              </span>
            )}
          </div>
        </Form.Item>
        <Form.Item>
          <div className={style.formItem}>
            <label>Изображение:</label>
            <Upload
              accept="image/*"
              beforeUpload={() => false} // Не загружать файл автоматически
              onChange={handleFileChange}
              showUploadList={false} // Скрыть список загруженных файлов
              maxCount={1} // Ограничиваем загрузку одним файлом
            >
              <Button icon={<UploadOutlined />}>Выберите файл</Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {type}
          </Button>
        </Form.Item>
      </Form>

      <div>
        {imageUrl && (
          <>
        <label>Предварительный просмотр:</label>

          <div className={style.imagePreview}>
            <img
              src={imageUrl}
              alt="Предварительный просмотр"
              className={style.image}
              width={100}
            />
          </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoryForm;