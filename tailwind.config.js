/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,tsx,js}'  // CSS, Typescript and JS and CSS files in src directory
  ],
  theme: {
    extend: {
      colors: {
        primary: '#383e54',
        success: {
          200: '#d6fed0',
          500: '#00ff00',
        },
        error: {
          200: '#f7cdcd',
          500: '#ff0000',
        },
        pending: '#c4c4c4',
      },
      fontSize: {
        sm: ['0.875rem', '1.17em'],
        base: ['1rem', '1.17em'],
        lg: ['1.125rem', '1.17em']
      }
    },
  },
  plugins: [],
}

