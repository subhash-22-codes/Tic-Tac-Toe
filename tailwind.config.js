// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        madimi: ['"Madimi One"', 'cursive'],
        outfit: ['"Outfit"', 'sans-serif'],
        modern: ['"Modern Outdoor"', 'sans-serif'],
        bungee: ['"Bungee"', 'cursive'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
