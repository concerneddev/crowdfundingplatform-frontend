import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../SVG/BACKGROUND.jpg'; // Ensure this path is correct
import { useEffect, useState } from 'react';
import Button from './Button';

const LandingPage = () => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("x-auth-token");
    if(token) {
      setIsUserLoggedIn(true);
    };

  }, [])

  useEffect(() => {
    console.log("IsUserLoggedIn: ", isUserLoggedIn);
  }, [isUserLoggedIn]);

  const handleViewCampaignsOnClick = () => {
    navigate('/home');
  }

  const handleStartOnClick = () => {
    navigate('/register');
  }

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center text-textPrimary bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div> 

      <header className="relative text-center mb-12">
        <h1 className="text-7xl font-sans font-bold text-primary mb-4 py-4">
          Fund Your Vision
        </h1>
        <p className="text-xl font-body text-primary max-w-lg mx-auto">
          Leverage decentralized crowdfunding for a secure and transparent way to turn your ideas into reality.
        </p>
      </header>
    
      <div className="relative mt-5 flex space-x-4">
        {isUserLoggedIn ? (
          <>
            <Button label='View Campaigns' onClick={handleViewCampaignsOnClick}/>
          </>
        ) : (
          <>
            <Button label='Start' onClick={handleStartOnClick} />
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
