/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.html",
    "./src/app/**/*.ts",
  ],
  safelist: [
    {
      pattern: /max-w-\[\d+%\]/, // matches max-w-[60%], max-w-[75%], etc.
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


