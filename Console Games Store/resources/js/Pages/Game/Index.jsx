import { debounce } from "lodash";
import { Head, router } from "@inertiajs/react";
import { useCallback, useEffect, useRef, useState } from "react";

import GameCard from "@/Components/GameCard";
import MainLayout from "@/Layouts/MainLayout";
import Pagination from "@/Components/Pagination";
import SortBy from "@/Pages/Game/Partials/SortBy";
import PlatformFilter from "@/Pages/Game/Partials/PlatformFilter";
import PriceFilter from "@/Pages/Game/Partials/PriceFilter";
import ClearFilter from "@/Pages/Game/Partials/ClearFilter";
import ConsoleGenerationFilter from "@/Pages/Game/Partials/ConsoleGenerationFilter";
import MobileFilter from "@/Pages/Game/Partials/MobileFilter";
import GenreFilter from "@/Pages/Game/Partials/GenreFilter";
import PublisherFilter from "@/Pages/Game/Partials/PublisherFilter";
import IndexBreadcrumb from "@/Pages/Game/Breadcrumb/IndexBreadcrumb";

export default function Index({
  filters,
  genres,
  console_generation,
  publishers,
  games,
}) {
  const isInitialMount = useRef(true);
  const [gameFilter, setGameFilter] = useState(filters);

  const handleCheckbox = (e, platformFilter) => {
    const filter = e.target.value;
    let filterArr = !gameFilter[platformFilter]
      ? []
      : gameFilter[platformFilter].split(",");

    if (e.target.checked) {
      if (!filterArr.includes(filter)) {
        filterArr.push(filter);
      }
    } else {
      if (filterArr.includes(filter)) {
        filterArr = filterArr.filter((word) => word !== filter);
      }
    }

    let newGameFilter = gameFilter;
    delete newGameFilter[platformFilter];

    setGameFilter({
      ...newGameFilter,
      ...(filterArr.length > 0 && {
        [platformFilter]: filterArr.join(","),
      }),
    });
  };

  const handleSelect = (e) => {
    const sortBy = e.target.value;

    let newGameFilter = gameFilter;
    delete newGameFilter.sort;

    setGameFilter({
      ...newGameFilter,
      ...(sortBy.length > 0 && {
        sort: sortBy,
      }),
    });
  };

  const submitFilter = useCallback(
    debounce(
      (gameFilter) =>
        router.get(route("game.index"), gameFilter, {
          preserveState: true,
          preserveScroll: true,
        }),
      500
    ),
    []
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      submitFilter(gameFilter);
    }
  }, [gameFilter]);

  return (
    <MainLayout filters={gameFilter}>
      <Head>
        <title>Games Listing — Game Store</title>
        <meta
          name="description"
          content="Buy games online from the No. 1 Online Gamestore in Malaysia! Enjoy fast & free shipping with min. spend, game deals & exclusive discounts."
        />
      </Head>

      <div className="container max-w-6xl mx-auto my-10 mt-0 px-4 xl:px-0">
        <IndexBreadcrumb />
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-center md:justify-between items-center pb-4">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Showing {games.from} to {games.to} of {games.total} results
          </p>
          <div className="w-full md:w-auto grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-0">
            <MobileFilter
              handleCheckbox={handleCheckbox}
              gameFilter={gameFilter}
              genres={genres}
              console_generation={console_generation}
              publishers={publishers}
            />
            <SortBy handleSelect={handleSelect} gameFilter={gameFilter} />
          </div>
        </div>

        <div className="flex">
          <div className="hidden md:flex md:flex-col w-[260px] space-y-4 shrink-0 pr-4 border-r border-gray-200 dark:border-gray-700">
            <ClearFilter gameFilter={gameFilter} />
            <PlatformFilter
              handleCheckbox={handleCheckbox}
              gameFilter={gameFilter}
            />
            <GenreFilter
              handleCheckbox={handleCheckbox}
              gameFilter={gameFilter}
              genres={genres}
            />
            <ConsoleGenerationFilter
              handleCheckbox={handleCheckbox}
              gameFilter={gameFilter}
              console_generation={console_generation}
            />
            <PublisherFilter
              handleCheckbox={handleCheckbox}
              gameFilter={gameFilter}
              publishers={publishers}
            />
            <PriceFilter
              handleCheckbox={handleCheckbox}
              gameFilter={gameFilter}
            />
          </div>

          <div className="grow md:pl-4">
            {games.data.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 lg:gap-x-6 gap-y-4 lg:gap-y-8">
                {games.data.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}

            {games.data.length < 1 && (
              <div className="w-full flex justify-center">
                <div className="w-full flex rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 flex-col">
                  <div className="flex h-full flex-col justify-start p-3 lg:p-6">
                    <p class="text-gray-900 dark:text-white text-center">
                      Sorry, there are no games found. Please try again with
                      different keywords or filters.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {games.data.length > 0 && (
              <div className="w-full flex justify-center mt-10">
                <Pagination links={games.links} />
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
