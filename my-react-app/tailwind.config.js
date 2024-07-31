// tailwind.config.js
module.exports = {
  mode: 'jit', // Just-in-Time mode
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // Update to 'content' for Tailwind CSS v3.x
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Roboto Slab', 'serif'],
      },
      // Other theme customizations
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'), // Add this line for aspect-ratio plugin
  ],
};
