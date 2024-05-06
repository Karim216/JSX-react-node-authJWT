/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f8f9fa",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da", // border
          500: "#adb5bd",
          600: "#6c757d", // text par defaut
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
        yellow: "#DDAC17",
        yellowDark: "#CD9C08",
        light: "#F6F6F6", // text mode dark
        dark: "#1F2123", // text mode light
        white: "#fff", // background mode clair
        black: "#000", // background mode dark
        blue: "#003A5C",
      },
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      md: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    fontFamily: {
      sans: ["palanquin", "arial", "sans-serif"],
      mono: ["Consolas", "monospace"],
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    spacing: {
      px: "1px",
      0: "0",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
    },
  },
  plugins: [],
};

// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         gray: {
//           100: '#f8f9fa',
//           200: '#e9ecef',
//           300: '#dee2e6',
//           400: '#ced4da', // border
//           500: '#adb5bd',
//           600: '#6c757d', // text par defaut
//           700: '#495057',
//           800: '#343a40',
//           900: '#212529',
//         },
//         yellow: '#DDAC17',
//         yellow-dark: '#CD9C08',
//         light: '#F6F6F6', // text mode dark
//         dark: '#1F2123', // text mode light
//         white: '#fff', // background mode clair
//         black: '#000', // background mode dark
//         blue: '#003A5C',
//       },
//     },
//     fontFamily: {
//       sans: ['arial', 'sans-serif'],
//       mono: ['Consolas', 'monospace'],
//     },
//     fontWeight: {
//         thin: '100',
//         extralight: '200',
//         light: '300',
//         normal: '400',
//         medium: '500',
//         semibold: '600',
//         bold: '700',
//         extrabold: '800',
//         black: '900',
//       },
//   },
// }
