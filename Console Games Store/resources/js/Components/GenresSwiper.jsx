import { Gamepad2 } from "lucide-react";
import { Link } from "@inertiajs/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function GenreSwiper() {
  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-2xl text-gray-900 dark:text-white">
          Genres
        </h2>
        <Link
          href={route("game.index")}
          className="underline hover:opacity-80 text-gray-900 dark:text-white font-medium text-xl"
        >
          View all
        </Link>
      </div>

      <div className="w-full pt-6">
        <Swiper
          spaceBetween={5}
          slidesPerView={2}
          slidesPerGroup={2}
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            768: {
              spaceBetween: 10,
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1440: {
              spaceBetween: 10,
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
          }}
          modules={[Navigation, Pagination]}
          className="rounded-lg mb-5"
        >
          <SwiperSlide>
            <Link
              href={route("game.index", { genre: "Action" })}
              className="flex flex-col items-center hover:scale-105 ease-in-out duration-300"
            >
              <Gamepad2 className="w-20 h-20 text-green-700 pt-4" />
              <p className="font-medium text-lg pt-2 text-gray-900 dark:text-white pb-6">
                Action
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={route("game.index", { genre: "Adventure" })}
              className="flex flex-col items-center hover:scale-105 ease-in-out duration-300"
            >
              <Gamepad2 className="w-20 h-20 text-green-700 pt-4" />
              <p className="font-medium text-lg pt-2 text-gray-900 dark:text-white pb-6">
              Adventure
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={route("game.index", { genre: "Simulation" })}
              className="flex flex-col items-center hover:scale-105 ease-in-out duration-300"
            >
              <Gamepad2 className="w-20 h-20 text-green-700 pt-4" />
              <p className="font-medium text-lg pt-2 text-gray-900 dark:text-white pb-6">
                Simulation
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={route("game.index", { genre: "Strategy" })}
              className="flex flex-col items-center hover:scale-105 ease-in-out duration-300"
            >
              <Gamepad2 className="w-20 h-20 text-green-700 pt-4" />
              <p className="font-medium text-lg pt-2 text-gray-900 dark:text-white pb-6">
              Strategy
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={route("game.index", { genre: "Sports" })}
              className="flex flex-col items-center hover:scale-105 ease-in-out duration-300"
            >
              <Gamepad2 className="w-20 h-20 text-green-700 pt-4" />
              <p className="font-medium text-lg pt-2 text-gray-900 dark:text-white pb-6">
                Sports
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={route("game.index", { genre: "Racing" })}
              className="flex flex-col items-center hover:scale-105 ease-in-out duration-300"
            >
              <Gamepad2 className="w-20 h-20 text-green-700 pt-4" />
              <p className="font-medium text-lg pt-2 text-gray-900 dark:text-white pb-6">
              Racing
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={route("game.index", { genre: "Horror" })}
              className="flex flex-col items-center hover:scale-105 ease-in-out duration-300"
            >
              <Gamepad2 className="w-20 h-20 text-green-700 pt-4" />
              <p className="font-medium text-lg pt-2 text-gray-900 dark:text-white pb-6">
                Horror
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={route("game.index", { genre: "Puzzle" })}
              className="flex flex-col items-center hover:scale-105 ease-in-out duration-300"
            >
              <Gamepad2 className="w-20 h-20 text-green-700 pt-4" />
              <p className="font-medium text-lg pt-2 text-gray-900 dark:text-white pb-6">
                Puzzle
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={route("game.index", { genre: "Fantasy" })}
              className="flex flex-col items-center hover:scale-105 ease-in-out duration-300"
            >
              <Gamepad2 className="w-20 h-20 text-green-700 pt-4" />
              <p className="font-medium text-lg pt-2 text-gray-900 dark:text-white pb-6">
                Fantasy
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={route("game.index", { genre: "Stealth" })}
              className="flex flex-col items-center hover:scale-105 ease-in-out duration-300"
            >
              <Gamepad2 className="w-20 h-20 text-green-700 pt-4" />
              <p className="font-medium text-lg pt-2 text-gray-900 dark:text-white pb-6">
                Stealth
              </p>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
