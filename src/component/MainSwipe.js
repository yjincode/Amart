import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // 모듈 가져오기
import "swiper/css"; // 기본 스타일
import "swiper/css/navigation"; // Navigation 스타일
import "swiper/css/pagination"; // Pagination 스타일 

function MainSwipe() {
  return (
    <Swiper
      modules={[Navigation, Pagination]} // 모듈 등록
      spaceBetween={50}
      slidesPerView={1}
      navigation // Navigation 활성화
      pagination={{ clickable: true }} // Pagination 활성화
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
}

export default MainSwipe;
