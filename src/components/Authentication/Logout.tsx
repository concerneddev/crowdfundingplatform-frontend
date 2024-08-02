import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../../contexts/GlobalStateProvider";

// Spinner component
const Spinner = () => (
    <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
  

const Logout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const {isLoggedIn, setIsLoggedIn} = useContext(GlobalStateContext);
  const handleLogout = async () => {
    setIsProcessing(true);

    // Simulate a delay for demonstration purposes
    setTimeout(async () => {
      // Remove the authentication token from session storage
      sessionStorage.removeItem("x-auth-token");

      // Navigate to the login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }, 1000); // Delay before starting the logout process
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      {!isProcessing ? (
        <>
          <h2 className="text-lg font-medium mb-4">Are you sure you want to log out?</h2>
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log Out
          </button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Logout;
