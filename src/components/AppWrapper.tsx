import React from "react";

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-background text-textPrimary font-body">
      {children}
    </div>
  );
};

export default AppWrapper;
