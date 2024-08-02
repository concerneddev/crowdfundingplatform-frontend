import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalStateContext } from "../contexts/GlobalStateProvider";

const Header = () => {
  // global state context
  const { isLoggedIn } = useContext(GlobalStateContext);
  console.log("Header: isLoggedIn: ", isLoggedIn);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            Your Logo
          </Link>
          {/* Conditionally render buttons based on isLoggedIn */}
          {isLoggedIn && (
            <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Donate
            </button>
          )}
          {isLoggedIn && (
            <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to="/createcampaign">Create</Link>
            </button>
          )}
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <Link
              to="/myprofile"
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
