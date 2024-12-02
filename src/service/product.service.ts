import { IProduct } from '../interface/product';
import { axiosClassic } from '../api/interseptots';

export const productsService = {
  async getProducts(){
    const response = await axiosClassic.get<IProduct[]>("/products");
    return response.data;
  },

  async getProductsFilteredByCategory(categoryId:number){
    const response = await axiosClassic.get<IProduct[]>(`/products/${categoryId}`);
    return response.data;
  },

  async getProductById(id:number){
    const response = await axiosClassic.get<IProduct>(`/products/${id}/details`);
    return response.data;
  },

  async addProduct(product: IProduct){
    const response = await axiosClassic.post<IProduct>('/products', product);
    return response.data;
  },

  async updateProduct(updatedProduct: IProduct){
    const response = await axiosClassic.patch<IProduct>(`/products/${updatedProduct.id}`, updatedProduct);
    return response.data;
  },

  async deleteProduct(id: number){
    const response = await axiosClassic.delete(`/products/${id}`);
    return response.data;
  },

  async uploadProductImages(productId: number, formData: FormData) {
    const response = await axiosClassic.post(`/products/${productId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async uploadProductVideo(productId: number, formData: FormData) {
    const response = await axiosClassic.post(`/products/${productId}/upload-video`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
};