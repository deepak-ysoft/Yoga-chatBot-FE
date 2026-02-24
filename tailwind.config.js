/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#dcfce7", // Soft green light
          DEFAULT: "#86efac", // Soft green DEFAULT
          dark: "#4ade80", // Soft green dark
        },
        sage: {
          50: "#f8faf9",
          100: "#f1f5f3",
          200: "#e2e9e5",
          300: "#cbdad1",
          400: "#9db4a8",
          500: "#7a9486",
          600: "#617a6d",
          700: "#4e6258",
          800: "#3f4f47",
          900: "#35423b",
          950: "#1a1f1d",
        },
        cream: {
          light: "#fffef9",
          DEFAULT: "#faf9f6", // Light beige / cream background
          dark: "#f3f2ee",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
