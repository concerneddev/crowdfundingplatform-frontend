import React from "react";

// Define the props type for the Button component
interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Button component definition
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="inline-flex items-center bg-transparent border-none text-black cursor-pointer font-sans text-base h-[2.5em] justify-center leading-[1.5] px-[calc(.5em-1px)] py-0.5 relative text-center select-none align-top whitespace-nowrap focus:outline-none hover:bg-black hover:text-white transition-all duration-300"
      role="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
