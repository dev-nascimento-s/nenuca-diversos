/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}" // Added as per request, though mostly unused in Vite structure
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111827", // Preserving the existing custom colors
        secondary: "#4B5563",
        accent: "#F59E0B",
      },
    },
  },
  plugins: [],
}
