import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productsService } from '../service/product.service';
import { IProduct } from '../interface/product';
import { message } from 'antd';

export const productData = () => {
  const { data: productsData, isLoading, error, isSuccess } = useQuery({ queryKey: ['products'], queryFn:() => productsService.getProducts(),
    staleTime: Infinity,
   });
  return { productsData, isLoading, error, isSuccess };
};

export const productDataFilterByCategoryId = (categoryId:number) => {
  const { data: productsDataFilterByCategoryId, isLoading, error, isSuccess } = useQuery({ queryKey: ['productsFilterByCategoryId'], queryFn:() => productsService.getProductsFilteredByCategory(categoryId),
   });
  return { productsDataFilterByCategoryId, isLoading, error, isSuccess };
};


export const getProductById = (id:number) => {
    const { data: productData, isLoading, error, isSuccess } = useQuery({ queryKey: ['productsById',id], queryFn:() => productsService.getProductById(id) });
    return { productData, isLoading, error, isSuccess };
  };

export const addProduct = () => {
  const queryClient = useQueryClient();


  const { mutate } = useMutation({
    mutationFn: (newProduct: IProduct) => productsService.addProduct(newProduct),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["products"],
        (oldData: IProduct[] | undefined) => [...(oldData || []), data]
      );
      message.success("Товар успешно добавлен")
    },
    onError: () => {
      message.error("Произошла ошибка при добавлении товара")
    }
  });
  return { mutate };
};

export const updateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (updatedProduct: IProduct) => productsService.updateProduct(updatedProduct),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["products"],
        (oldData: IProduct[] | undefined) => oldData?.map((product) =>
          product.id === data.id ? data : product
        )
      )
      message.success("Товар успешно обновлен")
     },
     onError: () => { message.error("Произошла ошибка при обновлении товара") }
  });
  return { mutate };
};

export const deleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate, error: errorProduct } = useMutation({
    mutationFn: (productId: number) => productsService.deleteProduct(productId),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["products"],
        (oldData: IProduct[] | undefined) => oldData?.filter((product) =>
          product.id !== data.id
        )
        )
      message.success("Товар успешно удален")
    },
    onError: () => {
      message.error("Произошла ошибка при удалении товара")
      }
  });
  return { mutate, errorProduct };
};

export const uploadProductImages = () => {
  const { mutate } = useMutation({
    mutationFn: ({ productId, images }: { productId: number, images: File[] }) => {
      const formData = new FormData();
      images.forEach(image => formData.append('files', image));
      return productsService.uploadProductImages(productId, formData);
    },onSuccess: () => {
      message.success("Изображения успешно добавлены")
    }
  });
  return { mutate };
};

export const uploadProductVideo = () => {
  const { mutate } = useMutation({
    mutationFn: ({ productId, video }: { productId: number, video: File }) => {
      const formData = new FormData();
     formData.append('file', video);
      return productsService.uploadProductVideo(productId, formData);
    },onSuccess: () => {
      message.success("Видео успешно добавлено")
    }
  });
  return { mutate };
};