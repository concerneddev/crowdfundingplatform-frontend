import React, { createContext, useState } from 'react';

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

export default GlobalStateContext;
