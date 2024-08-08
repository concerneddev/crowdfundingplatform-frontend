/// <reference types="vite-plugin-svgr/client" />
import React from 'react';
import LogoPNG from "../SVG/openfundme-logo-cropped.png"

const Logo: React.FC = () => {
  return (
      <img src={LogoPNG} alt="Logo" className="w-auto h-12 object-contain"/>
  );
};

export default Logo;
