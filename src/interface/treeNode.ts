export interface TreeNode {
    title: string;
    key: number | string; // Используем string для поддержки ключей
    children?: TreeNode[];
  }