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
          light: "#2A523A", // Slightly lighter green
          DEFAULT: "#1F3D2B", // Deep forest green (Requested)
          dark: "#14291D", // Darker forest green
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
          light: "#FFFFFF",
          DEFAULT: "#F5F3EF", // Warm neutral background (Requested)
          dark: "#EBE9E4",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Manrope",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "Playfair Display",
          "Cormorant Garamond",
          "serif",
        ],
      },
      borderRadius: {
        "button": "14px",
        "input": "16px",
        "card": "20px",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "soft": "0 4px 20px rgba(0, 0, 0, 0.05)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
