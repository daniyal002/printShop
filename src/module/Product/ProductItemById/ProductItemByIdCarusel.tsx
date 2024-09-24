import React from "react";
import { Carousel, ConfigProvider, Image } from "antd";
import { baseURL } from "../../../api/interseptots";
import ReactPlayer from "react-player";

interface Props {
  images: string[];
  video?: string;
}

const contentStyle: React.CSSProperties = {
  margin: "0 auto",
  textAlign: "center",
  background: "#364d79",
};

const ProductItemByIdCarusel = ({ images, video }: Props) => {
  console.log(images)
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowOffset: 1,
          },
        },
      }}
    >
      <Carousel
        // autoplay
        draggable
        arrows
        swipe
        style={{ width: "100%", margin: "0 auto", textAlign: "center" }}
      >
         {video && (
          <div style={{ display: "inline", margin: "0 auto",height:"424px" }}>
            <ReactPlayer
              url={`${baseURL}${video}`}
              loop
              // playing
              controls
              width={"100%"}
              height={424}
              style={{
                textAlign: "center",
                width: "100%",
                margin: "10px auto",
                height:"115%"
              }}
            />
          </div>
        )}
        {images.map((image,index) => (
          <div style={{ display: "inline", margin: "0 auto" }}  key={index}>

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
