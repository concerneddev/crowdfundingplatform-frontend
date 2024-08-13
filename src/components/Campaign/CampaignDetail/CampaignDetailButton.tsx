import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Button component definition
const CampaignDetailButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-buttonBg
        text-white 
        px-3 
        py-2
        text-sm
        cursor-pointer 
        transition 
        duration-300 
        ease-in-out 
        hover:bg-blue-600 
        active:bg-blue-700
        w-full
        "
    >
      {label}
    </button>
  );
};

export default CampaignDetailButton;
