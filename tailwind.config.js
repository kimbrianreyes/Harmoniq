/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1DB954", // Inspriation only, can be changed
        secondary: "#191414",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        harmoniq: {
          "primary": "#6366f1", // Indigo 500
          "secondary": "#a855f7", // Purple 500
          "accent": "#ec4899", // Pink 500
          "neutral": "#1f2937",
          "base-100": "#0f172a", // Slate 900
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
      "dark",
    ],
  },
}
