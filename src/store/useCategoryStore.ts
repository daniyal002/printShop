import { create } from "zustand";
import { ICategory } from "../interface/category";

interface CategoryStore {
    categories: ICategory[];
    setCategories: (categories: ICategory[]) => void;
    addCategory: (category: ICategory) => void;
    updateCategory: (category: ICategory) => void;
    removeCategory: (id: number) => void;
  }
  export const useCategoryStore = create<CategoryStore>((set) =>({
    categories: [],
    setCategories: (categories) => set({ categories: categories }),
    addCategory: (category) =>
      set((state) => ({ categories: [...state.categories, category] })),
    updateCategory: (category) =>
      set((state) => ({
        categories: state.categories.map((c) =>
          c.id === category.id ? category : c,
        ),
      })),
    removeCategory: (id) =>
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
      })),
  })
)
  