import { useMutation, useQuery } from "@tanstack/react-query";
import { categoriesService } from "../service/category.service";
import { ICategory } from "../interface/category";
import { useCategoryStore } from "../store/useCategoryStore";

  export const categoryData = () => {
    const { data: categoriesData, isLoading, error, isSuccess} = useQuery({queryKey:['categories'],queryFn: categoriesService.getCategories})
    return {categoriesData, isLoading, error,isSuccess}
  }

 export const addCategory = () =>{
  const addCategoryStore = useCategoryStore(state => state.addCategory)
 
    const {mutate} = useMutation(
        {
            mutationFn:(category_name:string) => categoriesService.addCategories(category_name),
            onSuccess: (data) => {addCategoryStore(data)}
        }
    )
      return {mutate}
 } 

 export const updateCategory = () =>{
  const updateCategoryStore = useCategoryStore(state => state.updateCategory)
  
    const {mutate} = useMutation(
        {
            mutationFn:(category:ICategory) => categoriesService.updateCategory(category),
            onSuccess: (data) => {updateCategoryStore(data)}
        }
    )
      return {mutate}
 }

 export const deleteCategory = () =>{
  const removeCategoryStore = useCategoryStore(state => state.removeCategory)

    const {mutate,error:errorCategory} = useMutation(
        {
            mutationFn:(category_id:number) => categoriesService.deleteCategory(category_id),
            onSuccess: (data) => {removeCategoryStore(data.id)}
        }
    )
      return {mutate,errorCategory}
 }
