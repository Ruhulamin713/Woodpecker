import React from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="navbar bg-black lg:flex justify-between z-10 sticky top-0">
      <div className="navbar-start w-full relative">
        <div className="dropdown bg-black ">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                className="px-2 text-black hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                to="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className="px-2 text-black hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                to="/blog"
              >
                Blog
              </Link>
            </li>

            <li>
              <Link
                className="px-2 text-black hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                to="/portfolio"
              >
                My Portfolio
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  {" "}
                  <Link
                    className="px-2 text-black hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    className="px-2 text-black hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                    onClick={() => {
                      signOut(auth);
                      localStorage.removeItem("accessToken");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li tabIndex="0">
                <Link
                  className="px-2 text-black hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <a className="btn text-white btn-ghost normal-case text-xl">
          WOODPECKER
        </a>
        <a className="normal-case text-xl lg:hidden absolute top-3 right-1">
          {user?.displayName}
        </a>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link
              className="px-2 text-white hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
              to="/"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className="px-2 text-white hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
              to="/blog"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className="px-2 text-white hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
              to="/portfolio"
            >
              My Portfolio
            </Link>
          </li>
          {user ? (
            <>
              <li>
                {" "}
                <Link
                  className="px-2 text-white hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="px-2 text-white hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                  onClick={() => {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                  }}
                >
                  Logout
                </button>
                <p className="px-2 text-white hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500">
                  {user?.displayName}
                </p>
              </li>
            </>
          ) : (
            <li tabIndex="0">
              <Link
                className="px-2 text-white hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
