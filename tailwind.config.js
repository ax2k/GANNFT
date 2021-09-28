module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './**/*.html',
      './js/**/*.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        '3xl': '2000px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
