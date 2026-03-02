/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'monster-white': '#e0e6ed',
        'metal-blue': '#1e3a8a',
        'deep-black': '#0a0a0a',
        'gothic-grey': '#2d3748',
        'accent-blue': '#3b82f6',
      },
      dropShadow: {
        'metal-glow': '0 0 15px rgba(59, 130, 246, 0.6)',
      }
    },
  },
  plugins: [],
}
