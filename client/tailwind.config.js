/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': "#F6F4F1",
        'secondary-color': "#ced0c8",
      },
    },
  },
  plugins: [],
}