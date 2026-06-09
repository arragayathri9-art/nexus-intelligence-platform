/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#070b17",
        neonBlue: "#00f0ff",
        neonPurple: "#8b5cf6",
        glass: "rgba(255,255,255,0.05)",
      },
      boxShadow: {
        neon: "0 0 15px #00f0ff",
        purple: "0 0 15px #8b5cf6",
      },
      animation: {
        pulseSlow: "pulse 3s infinite",
        spinSlow: "spin 10s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}