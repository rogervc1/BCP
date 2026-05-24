/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bcp: {
          navy: "#002A8D",
          orange: "#FF7800",
          sky: "#00B3FF",
          mist: "#F4F6F9",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0, 42, 141, 0.10)",
        card: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
