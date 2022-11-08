/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.html',
    './src/*.js',
    './src/index.js'
  ],
  darkMode: false, // or 'media' or 'class'
  safelist: [
    {
      pattern: /rounded-(md|sm|lg|full)/
    },
    {
      pattern: /(top|right|bottom|left)-0/
    },
    {
      pattern: /bg-(stone|red|orange|amber|yellow|lime|green|emerald|teal|rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan)-(50|100|400|700|800|900)/,
      variants: ['hover']
    },
    {
      pattern: /border-(red|yellow|green)-(200|300|400|700|800|900)/,
      variants: ['hover']
    },
    {
      pattern: /text-(stone|red|orange|amber|yellow|lime|green|emerald|teal|rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan)-(50|100|900)/,
    },
    {
      pattern: /[mp][xyrlbt]*-\d/
    },
    {
      pattern: /basis-(4|12|32)/,
      variants: ['peer-checked']
    },
    'absolute',
    'basis-4',
    'basis-8',
    'basis-32',
    'border',
    'border-2',
    'duration-300',
    'flex',
    'flex-1',
    'flex-row',
    'flew-col',
    'grid',
    'grid-cols-3',
    'grid-cols-9',
    'grow',
    'grow-0',
    'h-0',
    'h-8',
    'h-48',
    'h-full',
    'h-scren',
    'items-center',
    'justify-end',
    'justify-center',
    'list-disc',
    'list-inside',
    'opacity-90',
    'opacity-100',
    'overflow-y-scroll',
    'relative',
    'resize-none',
    'shrink',
    'shrink-0',
    'sr-only',
    'text-center',
    'transition-colors',
    'w-0',
    'w-8',
    'w-32',
    'w-80',
    'w-full',
    'w-screen',
    'z-40',
    'z-50'
  ],
  theme: {
    extend: {
      //TO SETUP, Unable to Link to Index.js
      animation: {
        fadeIn: 'fadeIn .75s linear',
        slideInTop: 'slideInTop 1s ease-in-out',
        slideInRight: 'slideInRight 1s ease-in-out',
        slideInBottom: 'slideInBottom 1s ease-in-out',
        slideInLeft: 'slideInLeft 1s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'}
        },
        slideInLeft: {
          '0%': {transform: 'translateX(400%)', opacity: '0'},
          '100%': {transform: 'translateX(0%)', opacity: '1'}
        },
        slideInRight: {
          '0%': {transform: 'translateX(-400%)', opacity: '0'},
          '100%': {transform: 'translateX(0%)', opacity: '1'}
        },
        slideInTop: {
          '0%': {transform: 'translateY(-400%)', opacity: '0'},
          '100%': {transform: 'translateX(0%)', opacity: '1'}
        },
        slideInBottom: {
          '0%': {transform: 'translateY(400%)', opacity: '0'},
          '100%': {transform: 'translateX(0%)', opacity: '1'}
        }
      }
    },
  },
  variants: {
  extend: {},
  },
  plugins: [],
};