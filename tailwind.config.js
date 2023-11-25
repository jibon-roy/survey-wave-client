/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'primary-main': '#009EFF',
      'primary-bg2': '#E1ECF2',
      'primary-text': '#030030',
      'primary-bg': '#F5F5F5',
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}
