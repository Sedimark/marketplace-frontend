module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/lib/esm/**/*.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    extend: {
      colors: {
        'sedimark-orange': {
          DEFAULT: '#ff6d43'
        },
        'sedimark-deep-blue': {
          DEFAULT: '#4C83B9'
        },
        'sedimark-dark-deep-blue': {
          DEFAULT: '#32567A'
        },
        'sedimark-light-blue': {
          DEFAULT: '#F4F8FC'
        },
        'sedimark-light-gray': {
          DEFAULT: '#D3DBDD'
        },
        'sedimark-black': {
          DEFAULT: '#000000'
        },
        'sedimark-white': {
          DEFAULT: '#ffffff'
        }
      }
    }

  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms')
  ]
}
