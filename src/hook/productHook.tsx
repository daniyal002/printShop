import { useMutation, useQuery } from '@tanstack/react-query';
import { productsService } from '../service/product.service';
import { IProduct } from '../interface/product';
import { useProductStore } from '../store/useProductStore';

export const productData = () => {
  const { data: productsData, isLoading, error, isSuccess } = useQuery({ queryKey: ['products'], queryFn: productsService.getProducts });
  return { productsData, isLoading, error, isSuccess };
};

export const getProductById = (id:number) => {
    const { data: productData, isLoading, error, isSuccess } = useQuery({ queryKey: ['productsById',id], queryFn:() => productsService.getProductById(id) });
    return { productData, isLoading, error, isSuccess };
  };

export const addProduct = () => {
  const addProductStore = useProductStore(state => state.addProduct);

  const { mutate } = useMutation({
    mutationFn: (newProduct: IProduct) => productsService.addProduct(newProduct),
    onSuccess: (data) => { addProductStore(data); }
  });
  return { mutate };
};

export const updateProduct = () => {
  const updateProductStore = useProductStore(state => state.updateProduct);

  const { mutate } = useMutation({
    mutationFn: (updatedProduct: IProduct) => productsService.updateProduct(updatedProduct),
    onSuccess: (data) => { updateProductStore(data); }
  });
  return { mutate };
};

export const deleteProduct = () => {
  const removeProductStore = useProductStore(state => state.removeProduct);

  const { mutate, error: errorProduct } = useMutation({
    mutationFn: (productId: number) => productsService.deleteProduct(productId),
    onSuccess: (data) => { removeProductStore(data.id); }
  });
  return { mutate, errorProduct };
};

export const uploadProductImages = () => {
  const { mutate } = useMutation({
    mutationFn: ({ productId, images }: { productId: number, images: File[] }) => {
      const formData = new FormData();
      images.forEach(image => formData.append('files', image));
      return productsService.uploadProductImages(productId, formData);
    },
  });
  return { mutate };
};