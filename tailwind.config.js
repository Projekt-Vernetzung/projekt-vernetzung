/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      red: colors.red,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      // CUSTOM COLORS
      // Header Colors
      color_header: "#72A7FF",
      color_header_font: "#000000",
      // Backround Colors
      color_background_1: "#F6F0FF",
      color_background_2: "#E6F4F1",
      // Footer Colors
      color_footer: "#7E90B0",
      color_footer_font: "#FFFFFF",
      // Font
      color_font: "#000000",
      color_font_light: "#9E9E9E",
      // Emergency Button
      color_emergency_button: "#DD0000",
      // Contact Banner
      color_contact_banner_background_1: "#E6F4F1",
      color_contact_banner_background_2: "#72A7FF",
    },
    extend: {
      screens: {
        md: "840px",
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      aspectRatio: {
        "3/2": "3 / 2",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
