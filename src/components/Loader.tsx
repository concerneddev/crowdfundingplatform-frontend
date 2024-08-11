import React from 'react';

const Loader: React.FC = () => {
  return (
    <div >
      <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
