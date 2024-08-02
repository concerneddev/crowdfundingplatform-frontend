import React, { useState, createContext, useEffect } from 'react';

interface GlobalStateContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const defaultGlobalStateContextValue: GlobalStateContextType = {
  isLoggedIn: JSON.parse(sessionStorage.getItem('isLoggedIn') || 'false'),
  setIsLoggedIn: (value) => {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(value));
  },
};

export const GlobalStateContext = createContext<GlobalStateContextType>(defaultGlobalStateContextValue);

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [isLoggedInState, setIsLoggedInState] = useState(defaultGlobalStateContextValue.isLoggedIn);

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedInState));
  }, [isLoggedInState]);

  const value = {
    isLoggedIn: isLoggedInState,
    setIsLoggedIn: (value: boolean) => {
      setIsLoggedInState(value);
    },
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
