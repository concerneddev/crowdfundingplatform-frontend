import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../contexts/GlobalStateProvider';
import Logo from './Logo';
import Button from './Button';

const Header = () => {
  // Global state context
  const { isLoggedIn } = useContext(GlobalStateContext);
  console.log('Header: isLoggedIn: ', isLoggedIn);

  // Initialize the navigate function
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    // Navigate to /myprofile when the button is clicked
    navigate('/myprofile');
  };

  const handleDonateClick = () => {
    navigate('/tagslist');
  }

  const handleCreateClick = () => {
    navigate('/createcampaign');
  }

  const handleLoginInClick = () => {
    navigate('/login');
  }

  const handleRegisterClick = () => {
    navigate('/register');
  }

  return (
    <header className="relative bg-headerBg py-1">
      {/* Centered Logo */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center">
        <Link to="/home" className="flex items-center">
          <Logo />
        </Link>
      </div>

      {/* Left-aligned section */}
      <div className="flex items-center space-x-4 absolute left-0 top-1/2 transform -translate-y-1/2 ml-4">
        {isLoggedIn && (
          <Button
          label="Donate"
          onClick={handleDonateClick}
        />
        )}
        {isLoggedIn && (
          <Button
          label="Create"
          onClick={handleCreateClick}
        />
        )}
      </div>

      {/* Centered Logo */}
      <div className="flex-grow flex justify-center">
        <Link to="/home" className="flex items-center">
          <Logo />
        </Link>
      </div>

      {/* Right-aligned section */}
      <div className="flex items-center space-x-4 absolute right-5 top-1/2 transform -translate-y-1/2 mr-4">

        {isLoggedIn ? (
          <Button
            label="Dashboard"
            onClick={handleDashboardClick}
          />
        ) : (
          <>
            <Button label='Login' onClick={handleLoginInClick} />
            <Button label='Register' onClick={handleRegisterClick} />
          </>
        )
      }
      </div>
    </header>
  );
};

export default Header;
