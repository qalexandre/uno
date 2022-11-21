/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Lilita One, sans-serif",
        inter: "inter, sans-serif",
        card: 'Leckerli One, sans-serif',
        skranji: 'Skranji, sans-serif',
      },
      colors: {
        orange: {
          600: "#EA6C25",
        },
        yellow: {
          500: "#F7DD43",
          600: "#E5CD3D",
        },
        black: {
          900: "#0B0B25"
        },
        gray: {
          100: "#E1E1E6",
          300: "#8D8D99",
          600: "#323238",
          800: "#202024",
          900: "#121214",
        },
        blue: {
          700: '#0059C2',
          800: '#191944',
          900: "#0B0B25",
        },
        red_card: {
          100: '#F13556'
        },
        green_card: {
          100: '#21B9B9'
        },
        gray_card: {
          100: '#515151'
        },
        orange_card: {
          100: '#EA6C25'
        },
      },
      spacing: {
        'w-login': '22rem',
        'h-login': '35rem',
        'h-largeCard': '9.43rem',
        'h-smallCard': '7.58rem',
        'w-largeCard': '6.25rem',
        'w-smallCard': '5rem',
      }
    },
    backgroundImage: {
      'background-pattern': "url('./src/assets/background.jpg')"
    },
    
  },
  plugins: [],
};
