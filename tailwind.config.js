/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Open Sans', 'Arial', 'sans-serif'],
        header: ['Playfair Display', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#000000',       // GoFundMe green
        secondary: '#F7F7F7',     // Light gray
        background: '#FFFFF',    // Very light gray
        card: '#FFFFFF',          // White
        textPrimary: '#333333',   // Dark gray
        textSecondary: '#555555', // Medium gray
        border: '#DDDDDD',        // Light gray
        hoverPrimary: '#388E3C',  // Darker green
        hoverSecondary: '#E0E0E0',// Light gray for hover effects
        headerBg: '#cfdbff',
        headerText: '#FFFFFF',
        headerTextAccent: '',
        headerTextHover: '',
        buttonBg: "#0d0d0d",
      },
    },
  },
  plugins: [],
}