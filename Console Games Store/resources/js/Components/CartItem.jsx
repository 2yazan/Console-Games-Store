import { useState } from "react";
import { Link } from "@inertiajs/react";

import CartQuantity from "@/Components/CartQuantity";

export default function CartItem({ cart }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const price = (cart.game_owner.price * cart.quantity).toLocaleString(
    "en-MY",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }
  );

  return (
    <div className="flex items-center space-x-3 md:space-x-6">
      <Link
        href={route("game.show", cart.game_owner.slug)}
        className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 rounded-md shrink-0 transition-transform ease-in-out hover:scale-105"
      >
        <img
          src={`/game_posters/${cart.game_owner.image}`}
          className={`w-28 h-40 object-cover rounded-md ${
            isDisabled ? "animate-pulse" : ""
          }`}
        />
      </Link>
      <div className="flex flex-col text-gray-900 dark:text-white">
        <p className={`font-medium ${isDisabled ? "animate-pulse" : ""}`}>
          {price}
        </p>
        <Link
          href={route("game.show", cart.game_owner.slug)}
          className="hover:underline"
        >
          <p className={`font-medium ${isDisabled ? "animate-pulse" : ""}`}>
            {cart.game_owner.title}
          </p>
        </Link>
        <CartQuantity
          cart={cart}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        />
      </div>
    </div>
  );
}
