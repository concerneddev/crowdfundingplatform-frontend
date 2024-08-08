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
      onClick={onClick}
      className="
        bg-buttonBg
        text-white 
        border 
        border-transparent 
        px-3 
        py-2
        text-sm
        cursor-pointer 
        transition 
        duration-300 
        ease-in-out 
        hover:bg-blue-600 
        active:bg-blue-700
      "
    >
      {label}
    </button>
  );
};

export default Button;
