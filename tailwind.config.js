/** @type {import('tailwindcss').Config} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landing",
        permanent: false,
      },
    ];
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EAF4C1",
          100: "#D2EDAA",
          200: "#B6E499",
          300: "#9EDD8B",
          400: "#7EBE82",
          500: "#6fa772",
          600: "#5f8f62",
          700: "#3f5f41",
          800: "#304831",
          900: "#203021",
        },
        base: "#eaeadf",
        "base-accent": "#f1f1ee",
      },
    },
    plugins: [],
  },
};
