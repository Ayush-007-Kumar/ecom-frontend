import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import React from "react";
import { bannerLists } from "../../Utils";
import { Pagination, EffectFade, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const colors = ["#fdc200", "#ff2c2c", "#21ad61", "#723da6"];

function HeroBanner() {
    
  return (
    <div className="py-2 rounded-md">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
      >
        {bannerLists.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div
              className=" h-full flex items-center rounded-md sm:h-[50vh] w-full"
              style={{ backgroundColor: colors[i] }}
            >
              <div className="h-full w-full flex justify-center items-center">
                <div className="hidden lg:flex justify-center items-center w-1/2 p-8 h-full">
                  <div className="text-center">
                    <h3 className="text-2xl text-white font-bold">
                      {item.title}
                    </h3>
                    <h1 className="text-4xl text-white font-bold mt-2">
                      {item.subtitle}
                    </h1>
                    <p className="text-white font-bold mt-4">
                      {item.description}
                    </p>
                    <Link
                      to="/products"
                      
                      className="mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    >
                      Shop
                    </Link>
                  </div>
                </div>
                <div className="w-full flex justify-center lg:w-1/2 ">
                  <img className="" src={item?.image} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroBanner;
