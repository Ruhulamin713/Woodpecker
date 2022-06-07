import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

const DashBoard = () => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  if (loading || adminLoading) return;
  return (
    <div className="p-10">
      <h1 className="text-orange-600 text-4xl font-bold my-3">DashBoard</h1>
      <div>
        <nav className="my-4">
          <Link
            className="mx-2 text-xl px-2 hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500 "
            to="/dashboard"
          >
            My Profile
          </Link>
          {user && !admin && (
            <>
              <Link
                className="mx-2 text-xl  px-2 hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                to="myorders"
              >
                My orders
              </Link>
              <Link
                className="mx-2 text-xl px-2 hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                to="review"
              >
                Review
              </Link>
            </>
          )}
          {admin && (
            <>
              <Link
                className="mx-2 text-xl px-2 hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                to="users"
              >
                Users
              </Link>
              <Link
                className="mx-2 text-xl px-2 hover:bg-gray-300 focus:outline-none focus:border-b-2 focus:border-red-500"
                to="addtools"
              >
                Add Tools
              </Link>
            </>
          )}
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
