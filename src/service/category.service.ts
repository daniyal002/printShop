import { ICategory } from "../interface/category"
import { axiosClassic } from "../api/interseptots"

export const categoriesService = {
    async getCategories (){
        const response = await axiosClassic.get<ICategory[]>('/categories')
        return response.data
    },

    async addCategories(category_name:string){
        console.log(category_name)
        const response = await axiosClassic.post<ICategory>('/categories',{category_name:category_name})
        return response.data
    },

    async updateCategory(updatedCategory:ICategory){
        const response = await axiosClassic.patch<ICategory>(`/categories/${updatedCategory.id}`, updatedCategory)
        return response.data
    },

    async deleteCategory(id:number){
        const response = await axiosClassic.delete(`/categories/${id}`)
        return response.data
    }
}