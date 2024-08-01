import React, { useState, createContext } from 'react';

interface GlobalStateContextType {
  isLoggedIn: boolean;
  showDonate: boolean;
  showCreate: boolean;
  showLogin: boolean;
  showAbout: boolean;
  showDashboard: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setShowDonate: (value: boolean) => void;
  setShowCreate: (value: boolean) => void;
  setShowLogin: (value: boolean) => void;
  setShowAbout: (value: boolean) => void;
  setShowDashboard: (value: boolean) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType>({
  isLoggedIn: false,
  showDonate: true,
  showCreate: true,
  showLogin: true,
  showAbout: true,
  showDashboard: false,
  setIsLoggedIn: () => {},
  setShowDonate: () => {},
  setShowCreate: () => {},
  setShowLogin: () => {},
  setShowAbout: () => {},
  setShowDashboard: () => {},
});

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDonate, setShowDonate] = useState(true);
  const [showCreate, setShowCreate] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const [showAbout, setShowAbout] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{
        isLoggedIn,
        showDonate,
        showCreate,
        showLogin,
        showAbout,
        showDashboard,
        setIsLoggedIn,
        setShowDonate,
        setShowCreate,
        setShowLogin,
        setShowAbout,
        setShowDashboard,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
