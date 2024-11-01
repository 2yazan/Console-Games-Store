import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import PlatformFilter from "@/Pages/Game/Partials/PlatformFilter";
import PriceFilter from "@/Pages/Game/Partials/PriceFilter";
import ClearFilter from "@/Pages/Game/Partials/ClearFilter";
import ConsoleGenerationFilter from "@/Pages/Game/Partials/ConsoleGenerationFilter";
import GenreFilter from "@/Pages/Game/Partials/GenreFilter";
import PublisherFilter from "@/Pages/Game/Partials/PublisherFilter";

export default function MobileFilter({
  handleCheckbox,
  gameFilter,
  genres,
  console_generations,
  publishers,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="group h-min items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-green-700	 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-green-700	 dark:focus:ring-cyan-800 rounded-lg focus:ring-2 flex w-full md:hidden"
      >
        <span className="w-full flex justify-between items-stretch transition-all duration-200 rounded-md text-sm px-4 py-2">
          <p>Refine By</p>
          <SlidersHorizontal className="h-5 w-5" />
        </span>
      </button>

      <div
        className={`fixed top-0 left-0 z-40 h-screen overflow-y-auto transition-transform ease-in-out duration-500 bg-white w-80 dark:bg-gray-800 ${
          isOpen ? "transform-none" : "-translate-x-full"
        }`}
      >
        <div className="w-80 z-10 fixed flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-4 py-4 bg-white dark:bg-gray-800">
          <h5 className="inline-flex items-center text-lg font-semibold text-gray-600 dark:text-gray-200">
            <SlidersHorizontal className="w-6 h-6 mr-2.5" />
            Filters
          </h5>
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white -mr-2"
          >
            <X />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <div className="flex flex-col space-y-4 px-4 pb-5 pt-[81px]">
          <ClearFilter gameFilter={gameFilter} />
          <PlatformFilter
            handleCheckbox={handleCheckbox}
            gameFilter={gameFilter}
            isMobile={true}
          />
          <GenreFilter
            handleCheckbox={handleCheckbox}
            gameFilter={gameFilter}
            genres={genres}
            isMobile={true}
          />
          <ConsoleGenerationFilter
            handleCheckbox={handleCheckbox}
            gameFilter={gameFilter}
            console_generations={console_generations}
            isMobile={true}
          />
          <PublisherFilter
            handleCheckbox={handleCheckbox}
            gameFilter={gameFilter}
            publishers={publishers}
            isMobile={true}
          />
          <PriceFilter
            handleCheckbox={handleCheckbox}
            gameFilter={gameFilter}
            isMobile={true}
          />
        </div>
      </div>

      <div
        onClick={() => setIsOpen(false)}
        className={`${
          isOpen ? "" : "hidden"
        } bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30`}
      ></div>
    </>
  );
}
