
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import './SplashCarousel.css'
import NeonBg from './neon_bg.jpeg'
import Slide1 from './slide-1.png'
import Slide2 from './slide-2.png'
import Slide3 from './slide-3.png'
// import NeonBg from './neon_bg2.png'

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
                <SwiperSlide><img src={Slide1}/></SwiperSlide>
                <SwiperSlide><img src={Slide2}/></SwiperSlide>
                <SwiperSlide><img src={Slide3}/></SwiperSlide>
            </Swiper>
        </>
    )
}

export default SplashCarousel;