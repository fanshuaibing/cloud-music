import React, { useEffect, useState } from "react";
import { SliderContainer } from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/components/navigation/navigation.min.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function Slider(props) {
  const { bannerList } = props;
  return (
    <SliderContainer>
      <div className="before" />
      <Swiper autoplay pagination={{ clickable: true }}>
        {bannerList.map((slider, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="slider-nav">
                <img
                  src={slider.imageUrl}
                  width="100%"
                  height="100%"
                  alt="推荐"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderContainer>
  );
}

export default React.memo(Slider);
