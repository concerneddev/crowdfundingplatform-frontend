/// <reference types="vite-plugin-svgr/client" />
import React from 'react';
import LogoIconPNG from "../SVG/openfundme-logo.png"

const LogoIcon: React.FC = () => {
  return (
      <img src={LogoIconPNG} alt="Logo" className="w-auto h-12 object-contain"/>
  );
};

export default LogoIcon;
