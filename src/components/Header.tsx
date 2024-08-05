import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalStateContext } from "../contexts/GlobalStateProvider";

const Header = () => {
  // Global state context
  const { isLoggedIn } = useContext(GlobalStateContext);
  console.log("Header: isLoggedIn: ", isLoggedIn);

  return (
    <header className="bg-headerBg shadow-md ">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Left-aligned section */}
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <button
              type="button"
              className="bg-headerTextAccent text-headerText font-body text-xl py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              Donate
            </button>
          )}
          {isLoggedIn && (
            <button
              type="button"
              className="bg-headerTextAccent text-headerText font-body text-xl py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              <Link to="/createcampaign">
                Create
              </Link>
            </button>
          )}
        </div>

        {/* Centered logo */}
        <div className="flex justify-center flex-1">
          <Link to="/" className="text-4xl font-header font-black text-primary hover:text-hoverPrimary transition-colors">
          Open Fund
          </Link>
        </div>

        {/* Right-aligned section */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Link
              to="/myprofile"
              className="bg-headerTextAccent text-headerText font-body text-xl py-2 px-4 hover:bg-gray-100 transition-colors"
              type="button"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-white border border-darkCharcoal text-black font-body font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-gray-100 transition-colors"
              type="button"
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
