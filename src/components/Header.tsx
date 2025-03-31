import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { RootState } from '../app/store';

export const Header = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-200 text-cards">
      <nav className="mx-auto px-6 py-2 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <div className="text-4xl text-cards flex font-bold">
          Career Wiz
        </div>

        {/* Mobile Menu Button */}
        <button
        type='button'
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-cards focus:outline-none"
        >
          {isOpen ? "Close" : "Menu"}
        </button>

        {/* Navigation Links */}
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
            <NavLink to="/" className="text-cards hover:text-black px-3 py-2">
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              className="text-cards hover:text-black px-3 py-2"
            >
              About Us
            </NavLink>
            <NavLink
              to="/explore"
              className="text-cards hover:text-black px-3 py-2"
            >
              Explore Careers
            </NavLink>
            <NavLink
              to="/contact"
              className="text-cards hover:text-black px-3 py-2"
            >
              Contact
            </NavLink>
            <NavLink
              to="/feedback"
              className="text-cards hover:text-black px-3 py-2"
            >
              Feedback
            </NavLink>

            {/* Show Dashboard if authenticated */}
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className="text-cards hover:text-black px-3 py-2"
              >
                Dashboard
              </NavLink>
            )}

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className="bg-cards hover:bg-secondary text-white lg:font-bold py-2 px-3 ml-3 rounded"
                >
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="bg-cards hover:bg-secondary text-white lg:font-bold py-2 px-4 ml-3 rounded"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link
                to="/logout"
                className="bg-red-600 hover:bg-red-700 text-white lg:font-bold py-2 px-4 ml-3 rounded"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

