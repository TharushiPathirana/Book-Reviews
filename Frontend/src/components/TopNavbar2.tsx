import { useState } from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import logo from "../assets/logo.png";

export function TopNavbar() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = () => setSignUpModalOpen(false);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-12" alt="Logo" />
        </a>

        <div className="flex-1 hidden md:flex justify-center">
          <ul className="flex flex-row font-medium space-x-8">
            <li>
              <a
                href="#"
                className="py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="flex ">
          <button
            className="py-2 px-4 mx-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={openSignUpModal}
          >
            Sign Up
          </button>
          {isSignUpModalOpen && (
            <SignUp isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />
          )}
          <button
            className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={openLoginModal}
          >
            Login
          </button>
          {isLoginModalOpen && (
            <SignIn isOpen={isLoginModalOpen} onClose={closeLoginModal} />
          )}
        </div>
      </div>
    </nav>
  );
}
