import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LandingBanner() {
  return (
    <div className="w-full mt-8">
      <style>
        {`
          /* Custom styles for Swiper navigation and pagination */
          .swiper-button-next, .swiper-button-prev {
            color: #047857 !important; /* green-700 */
          }
          .swiper-pagination-bullet {
            background-color: #10b981 !important; /* green-500 */
          }
          .swiper-pagination {
            bottom: 10px; /* Adjust pagination position */
          }
          .swiper-button-next, .swiper-button-prev {
            top: 50%; /* Center align arrows vertically */
            color: #10b981 !important; /* green-500 */
            width: 24px;
            height: 24px;
          }
        `}
      </style>
      <Swiper
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="rounded-lg mb-5 border border-gray-200 dark:border-gray-700"
      >
        <SwiperSlide>
          <div className="relative w-full h-64 bg-green-700 flex justify-center items-center text-white pb-5 md:pb-10">
            <div className="flex flex-col items-center">
              <p className="uppercase font-medium text-xs md:text-base pb-1 md:pb-2">
                GAME STORE
              </p>
              <p className="uppercase font-bold text-xs md:text-lg leading-none">
                FIND YOUR FAVOURITE
              </p>
              <p className="uppercase font-bold text-2xl md:text-4xl leading-none">
                GAME HERE
              </p>
            </div>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="relative w-full h-64 bg-green-700 flex justify-center items-center text-white pb-5 md:pb-10">
            <div className="flex flex-col items-center">
              <p className="uppercase font-medium text-xs md:text-base pb-1 md:pb-2">
                GAME STORE
              </p>
              <p className="uppercase font-bold text-xs md:text-lg leading-none">
                FIND YOUR FAVOURITE
              </p>
              <p className="uppercase font-bold text-2xl md:text-4xl leading-none">
                GAME HERE
              </p>
            </div>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="relative w-full h-64 bg-green-700 flex justify-center items-center text-white pb-5 md:pb-10">
            <div className="flex flex-col items-center">
              <p className="uppercase font-medium text-xs md:text-base pb-1 md:pb-2">
                GAME STORE
              </p>
              <p className="uppercase font-bold text-xs md:text-lg leading-none">
                FIND YOUR FAVOURITE
              </p>
              <p className="uppercase font-bold text-2xl md:text-4xl leading-none">
                GAME HERE
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
