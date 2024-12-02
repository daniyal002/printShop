import { categoryDataHierarchy } from "../../hook/categoryHook";
import { ICategory } from "../../interface/category";
import React from "react";
import { Tree } from "antd";
import style from "./Sidebar.module.scss"; // Импорт стилей для сайдбара
import { TreeNode } from "../../interface/treeNode";

const Sidebar: React.FC = () => {
  const { categoriesDataHierarchy, isLoading, error } = categoryDataHierarchy();

  // Обработка ошибок и состояния загрузки
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  // Преобразование категорий в формат, подходящий для компонента Tree
  // Преобразование категорий в формат, подходящий для компонента Tree
  const generateTreeData = (categories: ICategory[]): TreeNode[] => {
    return categories.reduce<TreeNode[]>((acc, category) => {
      // Проверяем, есть ли id, и если нет, пропускаем этот элемент
      if (category.id !== undefined) {
        acc.push({
          title: category.category_name,
          key: category.id, // Убедитесь, что id определено
          children: category.subcategories
            ? generateTreeData(category.subcategories)
            : [],
        });
      }
      return acc;
    }, []);
  };

  const treeData = generateTreeData(categoriesDataHierarchy as ICategory[]);

  const onSelect = (selectedKeys: React.Key[]) => {
    console.log("selected", selectedKeys);
    // Здесь вы можете обработать выбор категории
  };

  return (
    <div className={style.sidebar}>
      <Tree
        treeData={treeData}
        onSelect={onSelect}
        defaultExpandAll // Чтобы все узлы были развернуты по умолчанию
      />
    </div>
  );
};

export default Sidebar;
