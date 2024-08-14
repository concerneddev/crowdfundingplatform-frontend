import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Button component definition
const LandingPageButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="inline-flex items-center bg-black border-none text-white cursor-pointer font-sans text-base h-[2.5em] px-10 justify-center leading-[1.5] px-[calc(.5em-1px)] py-0.5 relative text-center select-none align-top whitespace-nowrap focus:outline-none hover:bg-white hover:text-black transition-all duration-300"
      role="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default LandingPageButton;
