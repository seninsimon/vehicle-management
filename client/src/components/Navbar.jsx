import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
        </div>

        {/* Center: App Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold hidden md:block">
          Rich Wheels
        </div>

        {/* Right: Settings + Login/Logout (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/settings" className="hover:text-yellow-400">
            Settings
          </Link>
          <button
            onClick={toggleLogin}
            className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4">
          <div className="text-center text-white font-semibold mb-2">
            Rich Wheels
          </div>
          <Link
            to="/settings"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-yellow-400"
          >
            Settings
          </Link>
          <button
            onClick={toggleLogin}
            className="w-full mt-3 bg-yellow-500 text-black px-3 py-2 rounded hover:bg-yellow-400"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
