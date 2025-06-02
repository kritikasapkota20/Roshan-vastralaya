/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "primary" : "#ef6a6a",
        // "primary" : "#00719B",
        "primary":"#A5383A",
        // "primaryHover":"#1e6680",
        "primaryHover":"#8E2E31",
        "sec-gray" : "#F5F5F5",
        "sec-dark-gray" : "#333",
        "dark-orange" : "#A84300",
        "light-orange" : "#FF6F3C",

      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
