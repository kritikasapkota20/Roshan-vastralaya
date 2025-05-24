/** @type {import('tailwindcss').Config} */
export default {
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#00719B",
        "primaryHover":"#1e6680",
        "sec-gray": "#F8F9FA",
        "sec-dark-gray": "#343A40",
        "accent": "#E74C3C",
        "neutral": "#ECF0F1"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        customMono: ['Courier New', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        robotoMono: ['Roboto Mono', 'monospace'],
        lato: ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
