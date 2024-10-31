import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Accordion } from "flowbite-react";

import MainLayout from "@/Layouts/MainLayout";
import ShareLink from "@/Components/ShareLink";
import AddToCart from "@/Components/AddToCart";
import RelatedGames from "@/Components/RelatedGames";
import QuantityInput from "@/Components/QuantityInput";
import GameDescription from "@/Components/GameDescription";
import ShowBreadcrumb from "@/Pages/Game/Breadcrumb/ShowBreadcrumb";

export default function Show({ game, relatedGames }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (quantity < game.stocks) {
      setQuantity(quantity + 1);
    }
  };

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    if (e.target.value > game.stocks) {
      setQuantity(game.stocks);
    } else if (e.target.value < 1) {
      setQuantity(1);
    } else {
      setQuantity(e.target.value);
    }
  };

  const price = game.price.toLocaleString("en-MY", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <MainLayout>
      <Head>
        <title>{`${game.title} — Game Store`}</title>
        <meta
          name="description"
          content={`${
            game.description.replace(/\\n/g, "").length > 150
              ? game.description.replace(/\\n/g, "").substring(0, 150) + "..."
              : game.description.replace(/\\n/g, "")
          }`}
        />
      </Head>

      <div className="container max-w-7xl mx-auto my-10 px-4 xl:px-0">
        <ShowBreadcrumb title={game.title} />
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <div className="flex rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 flex-col">
              <div className="flex h-full flex-col justify-start p-3 lg:p-4">
                <img
                  className="object-cover w-full h-auto rounded-md"
                  src={`/game_posters/${game.image}`}
                  alt={game.title}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col text-gray-900 dark:text-white">
            <h1 className="font-medium text-4xl">{game.title}</h1>

            <h2 className="font-bold text-3xl text-green-700 dark:text-cyan-600 mt-3">
              {price}
            </h2>

            <div className="mt-4 font-medium">
              <p>
              Console_generation: <span className="font-normal">{game.console_generation}</span>
              </p>
              <p>
              Developer: <span className="font-normal">{game.developer}</span>
              </p>
            </div>

            <p className="mt-3 font-medium">
              Stocks:{" "}
              {game.stocks > 0 && (
                <span className="font-normal text-green-500">
                  {game.stocks} units available
                </span>
              )}
              {game.stocks < 1 && (
                <span className="font-normal text-red-500">Out of stocks</span>
              )}
            </p>

            <QuantityInput
              quantity={quantity}
              handleAdd={handleAdd}
              handleMinus={handleMinus}
              handleQuantityChange={handleQuantityChange}
            />

            <hr className="border-gray-200 dark:border-gray-700" />

            <div className="mt-8">
              <AddToCart id={game.id} quantity={quantity} />
            </div>

            <hr className="mt-8 border-gray-200 dark:border-gray-700" />

            <GameDescription description={game.description} />

            <Accordion className="mt-8">
              <Accordion.Panel>
                <Accordion.Title className="py-3 focus:ring-2">
                  Game Details
                </Accordion.Title>
                <Accordion.Content className="py-3 text-sm font-medium text-gray-600 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="flex justify-between py-2">
                    <p>Publisher</p>
                    <p>{game.publisher}</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p>Release date</p>
                    <p>{game.release_date}g</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p>Console Generation</p>
                    <p>{game.console_generation}</p>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <p className="mt-6 font-medium">Share: </p>
            <ShareLink title={game.title} slug={game.slug} />
          </div>
        </div>
        <RelatedGames games={relatedGames} />
      </div>
    </MainLayout>
  );
}
