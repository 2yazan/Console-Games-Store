import { Link } from "@inertiajs/react";
import { VscAccount } from "react-icons/vsc";
import { IoSearchSharp } from "react-icons/io5";
import { Navbar } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import CartToggle from "@/Components/CartToggle";

export default function MainNavbar({ user, carts }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Using Inertia visit for search
      window.location.href = route('game.index', { search: searchTerm });
    }
  };

  return (
    <div className="sticky top-0 z-20">
      <Navbar className="border-b">
        <Navbar.Brand as={Link} href="/">
          <img
            alt="Game Store Logo"
            className="mr-3 h-6 sm:h-9"
            src="/game-store.png"
          />
          <span className="self-center whitespace-nowrap text-xl font-bold">
            Game Store
          </span>
        </Navbar.Brand>
        
        {/* Search Bar Container */}
        <div className="flex items-center justify-center flex-grow px-4">
          <form onSubmit={handleSearch} className="w-full max-w-2xl">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="I'm looking for..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-green-700 focus:border-green-700 block w-full p-2.5 pr-10"
              />
              <button
                type="submit"
                className="absolute right-0 mr-3 text-gray-600 hover:text-gray-900"
              >
                <IoSearchSharp className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Icons Container */}
        <div className="flex md:order-2 items-center space-x-4 pr-4">
          <CartToggle carts={carts} />
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-black flex items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <VscAccount className="icon h-6 w-6 text-gray-600" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-50">
                <ul className="py-2 text-sm text-gray-700">
                  {user ? (
                    <>
                      <li>
                        <Link
                          href={route("profile")}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={route("logout")}
                          method="post"
                          as="button"
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href={route("login")}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={route("register")}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}