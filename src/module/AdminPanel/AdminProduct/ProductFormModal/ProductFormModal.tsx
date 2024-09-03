import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react';
import ProductForm from '../ProductForm/ProductForm';
import { IProduct } from '../../../../interface/product';
import { updateProduct, uploadProductImages, uploadProductVideo } from '../../../../hook/productHook';


interface Props{
    values:IProduct
    isModalOpen:any
    handleOk:any
    handleCancel:any
  }

export function ProductFormModal({isModalOpen, handleOk, handleCancel,values}:Props){
  

  const { mutate: updateMutation } = updateProduct();
  const { mutate: uploadImagesMutation } = uploadProductImages();
  const { mutate: uploadVideoMutation } = uploadProductVideo();
  const [updateValue,setUpdateValue] = useState<IProduct>()

  useEffect(()=>{
    if(values){
        setUpdateValue(values)
    }
  },[values])

    const handleUpdate = (data: IProduct, images: File[], video: File) => {
        updateMutation(data, {
          onSuccess: (updatedProduct) => {
            if(images.length > 0){
              uploadImagesMutation({ productId: updatedProduct.id as number, images });
            }
            if(video){
              uploadVideoMutation({ productId: updatedProduct.id as number, video })
            }
          }
        });
      };

    return(
        <>
        <Modal title={`Изменение товара`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={(_) => (
              <>
                <Button onClick={handleCancel}>Закрыть</Button>
              </>
            )}>
            {updateValue && (<ProductForm initialValues={updateValue} onSubmit={handleUpdate} type="Изменить" isModalOpen={isModalOpen}/>)}
        </Modal>
        </>
    )
   
}