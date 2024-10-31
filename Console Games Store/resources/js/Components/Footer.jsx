import PaymentOption from "@/Components/PaymentOption";
import { Link } from "@inertiajs/react";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-700">
      <div className="mx-auto w-full container py-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* First Column */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex mb-3">
              <img
                src="/game-store.png"
                className="h-8 mr-3"
                alt="Game Store Logo"
              />
              <span className="self-center text-xl font-bold whitespace-nowrap text-green-700	 dark:text-white">
                Game Store
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">Connect with us</p>
            <div className="flex mt-3 gap-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-900 dark:hover:text-white">
                <Facebook />
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-900 dark:hover:text-white">
                <Instagram />
                <span className="sr-only">Instagram page</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-900 dark:hover:text-white">
                <Twitter />
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-900 dark:hover:text-white">
                <Github />
                <span className="sr-only">GitHub account</span>
              </a>
            </div>
          </div>

          {/* Second Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-400 uppercase dark:text-white">Games</h3>
            <ul>
              <li className="mb-2">
                <Link href={route("game.index")} className="font-normal text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline">
                  All Games
                </Link>
              </li>
              <li className="mb-2">
                <Link href={route("game.index")} className="font-normal text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline">
                  Buy Games
                </Link>
              </li>
              <li className="mb-2">
                <Link href={route("game.index")} className="font-normal text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline">
                  Search Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-400 uppercase dark:text-white">Help and support</h3>
            <ul>
              <li className="mb-2">
                <a href="#" rel="noreferrer nofollow" className="font-normal text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline">
                  About us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" rel="noreferrer nofollow" className="font-normal text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Fourth Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-400 uppercase dark:text-white">Legal</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="font-normal text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="font-normal text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-2 text-center mt-6">
          <p className="font-normal text-gray-600 dark:text-gray-400">
            Game Store © {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
