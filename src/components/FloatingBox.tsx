import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface FloatingBoxProps {
  children: ReactNode;
  title: string;
  colour: string;
}

const FloatingBox: React.FC<FloatingBoxProps> = ({ children, title, colour }) => {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <>
      <button
        onClick={toggleVisibility}
        style={{ backgroundColor: colour }} 
        className="right-4 text-white text-[12px] px-4 py-2 rounded-full shadow-lg hover:bg-opacity-80 transition-colors"
      >
        {title}
      </button>

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={boxRef}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 relative flex flex-col items-center"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <button
                onClick={toggleVisibility}
                className="text-black font-bold hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingBox;
