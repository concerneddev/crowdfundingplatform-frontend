import React from 'react';

interface LoaderProps {
  caption: string;
}

const Loader: React.FC<LoaderProps> = ({caption}) => {
  return (
    <div className='flex flex-col items-center gap-3'>
      <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent border-solid rounded-full animate-spin"></div>
      <div className='text-black'>{caption}</div>
    </div>
  );
};

export default Loader;
