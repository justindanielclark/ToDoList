/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  safelist: [
    {
      pattern: /rounded-(sm|md|lg|full)/
    },
    {
      pattern: /(top|right|bottom|left)-0/
    },
    {
      pattern: /bg-(stone|red|orange|amber|yellow|lime|green|emerald|teal|rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan)-(50|100|300|400|700|800|900)/,
      variants: ['hover']
    },
    {
      pattern: /border-(stone|red|orange|amber|yellow|lime|green|emerald|teal|rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan)-700/,
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
    'border-b-2',
    'border-r-2',
    'border-b-stone-100',
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
    'h-4',
    'h-8',
    'h-48',
    'h-full',
    'h-scren',
    'items-center',
    'justify-end',
    'justify-center',
    'list-disc',
    'list-inside',
    'm-h-0',
    'overflow-y-scroll',
    'relative',
    'resize-none',
    'shrink',
    'shrink-0',
    'sr-only',
    'text-center',
    'text-3xl',
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
      animation: {
        appearFromBelow: 'appearFromBelow 1s ease-in-out',
        contractAndFadeOut: 'contractAndFadeOut .1s ease-in-out',
        disappearBelow: 'disappearBelow 1s ease-in-out',
        expandAndFadeIn: 'expandAndFadeIn .1s ease-in-out',
        expandAndSlideIn: 'expandAndSlideIn .6s ease-in-out',
        fadeIn: 'fadeIn .5s linear',
        fadeOut: 'fadeOut .5s linear',
        heightContract: 'heightContract .25s ease-in-out',
        heightExpand: 'heightExpand .25s ease-in-out',
        slideInTop: 'slideInTop .5s ease-in-out',
        slideInRight: 'slideInRight .5s ease-in-out',
        slideInBottom: 'slideInBottom .5s ease-in-out',
        slideInLeft: 'slideInLeft .5s ease-in-out',
        slideOutAndContract: 'slideOutAndContract .6s ease-in-out',
        slideOutTop: 'slideOutTop .5s ease-in-out',
        slideOutRight: 'slideOutRight .5s ease-in-out',
        slideOutBottom: 'slideOutBottom .5s ease-in-out',
        slideOutLeft: 'slideOutLeft .5s ease-in-out',
      },
      keyframes: {
        appearFromBelow: {
          '0%': {transform: 'translateY(300%)'},
          '50%': {transform: 'translateY(300%)'},
          '100%': {transform: 'translateY(0%)'}
        },
        contractAndFadeOut: {
          '0%': {opacity: '1', maxHeight: '16rem', marginBottom: '1rem', paddingTop: '1rem'},
          '100%': {opacity: '0', maxHeight: '0rem', marginBottom: '0rem', paddingTop: '0rem'},
        },
        disappearBelow: {
          '0%': {transform: 'translateY(0%)'},
          '50%': {transform: 'translateY(0%)'},
          '55%': {transform: 'translateY(-15%)'},
          '100%': {transform: 'translateY(300%)'}
        },
        expandAndSlideIn: {
          '0%': {transform: 'translateX(-150%)', maxHeight: '0px', marginBottom: '0rem'},
          '50%': {transform: 'translateX(-150%)', maxHeight: '90px', marginBottom: '1rem'},
          '100%': {transform: 'translateX(0%)', maxHeight: '90px', marginBottom: '1rem'},
        },
        expandAndFadeIn: {
          '0%': {opacity: '0', maxHeight: '0rem', marginBottom: '0rem', paddingTop: '0rem'},
          '100%': {opacity: '1', maxHeight: '16rem', marginBottom: '1rem', paddingTop: '1rem'},
        },
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'}
        },
        fadeOut: {
          '0%': {opacity: '1'},
          '100%': {opacity: '0'}
        },
        heightContract: {
          '0%': {maxHeight: '70px'},
          '100%': {maxHeight: '0'}
        },
        heightExpand: {
          '0%': {maxHeight: '0'},
          '100%': {maxHeight: '70px'}
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
          '100%': {transform: 'translateY(0%)', opacity: '1'}
        },
        slideInBottom: {
          '0%': {transform: 'translateY(400%)', opacity: '0'},
          '100%': {transform: 'translateY(0%)', opacity: '1'}
        },
        slideOutAndContract: {
          '0%': {transform: 'translateX(0%)', maxHeight: '90px', marginBottom: '1rem'},
          '50%': {transform: 'translateX(-150%)', maxHeight: '90px', marginBottom: '1rem'},
          '100%': {transform: 'translateX(-150%)', maxHeight: '0px', marginBottom: '0rem'}
        },
        slideOutLeft: {
          '0%': {transform: 'translateX(0%)', opacity: '1'},
          '100%': {transform: 'translateX(400%)', opacity: '0'}
        },
        slideOutRight: {
          '0%': {transform: 'translateX(0%)', opacity: '1'},
          '100%': {transform: 'translateX(-400%)', opacity: '0'}
        },
        slideOutTop: {
          '0%': {transform: 'translateY(0%)', opacity: '1'},
          '100%': {transform: 'translateY(-400%)', opacity: '0'}
        },
        slideOutBottom: {
          '0%': {transform: 'translateY(0%)', opacity: '1'},
          '100%': {transform: 'translateY(400%)', opacity: '0'}
        },
      }
    },
  },
  variants: {
  extend: {},
  },
  plugins: [],
};