import React from "react";
import { Carousel, ConfigProvider, Image } from "antd";
import { baseURL } from "../../../api/interseptots";

interface Props {
  images: string[];
}

const contentStyle: React.CSSProperties = {
  margin: "0 auto",
  textAlign: "center",
  background: "#364d79",
};

const ProductItemByIdCarusel = ({ images }: Props) => {
 

  return (
    <ConfigProvider 
    theme={{
        components:{
            Carousel:{
                arrowOffset:1,
                
            }
        }
    }}>
    <Carousel autoplay draggable   arrows  swipe  style={{width:"100%", margin:"0 auto", textAlign:"center"}}>
      {images.map((image) => (
        <div style={{ display: "inline",margin: "0 auto",}}>
          <Image
            width={300}
            src={`${baseURL}/uploads/${image}`}
            style={contentStyle}
          />
        </div>
      ))}
    </Carousel>
    </ConfigProvider>
  );
};

export default ProductItemByIdCarusel;
