/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: ["light", "cupcake"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
}
