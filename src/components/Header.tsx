import React , { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalStateContext from "../contexts/GlobalStateContext";

const Header = () => {
  const {
    isLoggedIn,
    showDonate,
    showCreate,
    showLogin,
    showAbout,
    showDashboard,
  } = useContext(GlobalStateContext);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            Your Logo
          </Link>
          {showDonate && (
            <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Donate
            </button>
          )}
          {showCreate && (
            <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          )}
        </div>
        <div className="flex items-center">
          {!isLoggedIn && (
            <Link
              to="/login"
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              Sign In
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/myprofile"
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
