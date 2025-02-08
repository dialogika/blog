"use client";
import React, { useRef } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";



interface gambarProps {
  id: number;
  title: string;
  src: string;
}
interface imgArrayProps {
  imgArray: gambarProps[];
}

const ProductImages = ({ imgArray }: imgArrayProps) => {
  console.log("ini adalah imgArray: ", imgArray);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const swiperRef = useRef<any>(null);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };
  
  return (
    <>
      
      <figure className="overflow-hidden product-img position-relative">
        
        <Swiper 
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          pagination={{clickable: true}}
         
          modules={[Pagination, Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="mySwiper"
          style={{ marginBottom: '20px' }}
          >
          {/* Mapping array gambar*/}
          {imgArray.map((item) => (
          

              <SwiperSlide key={item.id} >
                <img
                className="object-fit-contain img-fluid"
                style={{ width: 350, height: 350 }}
                src={imgArray[activeIndex].src}
                alt={imgArray[activeIndex].title}
                />
              
              </SwiperSlide>
          ))}
        </Swiper>
        {/* Thumbnail */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {imgArray.map((item, index) => (
            <img
              key={item.id}
              src={item.src}
              alt={item.title}
              onClick={() =>setActiveIndex(index)}
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                cursor: 'pointer',
                border: index === activeIndex ? '2px solid blue' : '2px solid #ddd',
                borderRadius: '5px',
              }}
            />
          ))}
         </div>
      </figure>
    </>
  );
};

export default ProductImages;
