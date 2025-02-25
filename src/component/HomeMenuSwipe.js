import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/css';
import 'swiper/css/pagination'; // 페이지네이션 스타일
import 'swiper/css/navigation'; // 네비게이션 버튼 스타일 (필요하면 추가)

import './HomeMenuSwipeStyle.css';
import { Autoplay } from 'swiper/modules'
export default function HomeMenuSwipe({slides, reverseDirection}) {
  
  return ( 
    <Swiper
      spaceBetween={16}
      slidesPerView="auto"
      allowTouchMove={false}
      modules={[Autoplay]}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverseDirection || false
      }}
      loop={true}
      speed={10000}
      style={{ height: '200px' }}
      className='swiper2'
    > 
    {slides.map((slide)=>(
      <SwiperSlide key={slide.id} className='swiper-slide2'>
        <img src={slide.image} alt={slide.title} />
      </SwiperSlide>
    ))}
    </Swiper>
  );
};