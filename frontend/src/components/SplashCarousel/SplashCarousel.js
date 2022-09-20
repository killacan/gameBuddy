
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import './SplashCarousel.css'
import NeonBg from './neon_bg.jpeg'

const SplashCarousel  = () => {

    return(
        <>
            <Swiper className="carousel" id="swiper-outer-container"
                pagination={true}
                cssMode={true}
                navigation={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation,Pagination,Mousewheel,Keyboard]}
            >
                <SwiperSlide><img id="neon-ng" src={NeonBg}/></SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        </>
    )
}

export default SplashCarousel;