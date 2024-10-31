import { Link } from "@inertiajs/react";
import AddToCart from "@/Components/AddToCart";

export default function GameCard({ game }) {
  const price = game.price.toLocaleString("en-MY", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
  return (
    <Link href={route("game.show", game.slug)}>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 flex-col">
        <div className="flex h-full flex-col justify-start p-3 lg:p-6">
          <img
            className="object-cover w-full h-60 md:h-72 rounded-md"
            src={`/game_posters/${game.image}`}
            alt={game.title}
          />
          <p className="text-gray-500 dark:text-gray-400 uppercase text-xs md:text-sm mt-1 md:mt-3 truncate">
            {game.publisher}
          </p>
          <h5 className="text-sm md:text-base font-bold text-gray-900 dark:text-white line-clamp-2 my-1 md:my-2 min-h-[40px] md:min-h-[50px]">
            <p>{game.title}</p>
          </h5>
          <p className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base">
            {price}
          </p>
          {game.stocks > 0 && (
            <p className="text-xs md:text-sm mt-1 text-green-500 dark:text-green-400">
              In Stock
            </p>
          )}
          {game.stocks < 1 && (
            <p className="text-sm mt-1 text-red-500 dark:text-red-400">
              Out of Stock
            </p>
          )}
          <div className="mt-3">
            <AddToCart id={game.id} quantity={1} />
          </div>
        </div>
      </div>
    </Link>
  );
}
