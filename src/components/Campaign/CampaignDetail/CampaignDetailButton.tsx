import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Button component definition
const CampaignDetailButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="
    bg-black
    border-0
    rounded-lg
    shadow-lg
    text-white
    font-bold
    flex
    items-center
    justify-center
    text-sm
    py-3
    px-5
    whitespace-nowrap
    cursor-pointer
    font-sans
    transition
    duration-200
    ease-in-out
    w-full
    min-w-[140px]
    sm:text-sm
    sm:min-w-[196px]
    hover:bg-white
    hover:text-black
  "
      role="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CampaignDetailButton;
