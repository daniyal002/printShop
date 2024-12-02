import React, { useRef, useState } from "react";
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
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleBeforeChange = (currentSlide: number) => {
    // Останавливаем видео, если переходим с видео слайда
    if (currentSlide === 0 && video) {
      setIsPlaying(false);
    }
  };

  const handleAfterChange = (nextSlide: number) => {
    // Запускаем видео, если переходим на видео слайд
    if (nextSlide === 0 && video) {
      setIsPlaying(true);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowOffset: 1,
            arrowSize:32,
          },
        },
      }}
    >
      <Carousel
        draggable
        arrows
        swipe
        infinite={false}
        style={{ width: "100%", margin: "0 auto", textAlign: "center" }}
        beforeChange={handleBeforeChange}
        afterChange={handleAfterChange}
      >
        {video && (
          <div style={{ display: "inline", margin: "0 auto", height: "424px" }}>
            <ReactPlayer
              ref={playerRef}
              url={`${baseURL}${video}`}
              loop
              playing={isPlaying}
              controls
              width={300}
              height={400}
              style={{
                textAlign: "center",
                width: "100%",
                margin: "10px auto",
                height: "115%",
              }}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
            />
          </div>
        )}
        {images.map((image, index) => (
          <div style={{ display: "inline", margin: "0 auto" }} key={index}>
            <Image
              width={300}
              height={400}
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