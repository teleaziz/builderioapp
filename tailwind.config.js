const defaultTheme = require( 'tailwindcss/defaultTheme' );
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        },
      },
      fontFamily: {
        sans: [ 'Trade', ...defaultTheme.fontFamily.sans ],
      },
    },
  },
  plugins: [],
};