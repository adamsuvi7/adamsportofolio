/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Deep Trust
        deep: { DEFAULT: "#14123A", 950: "#0B0A24", 900: "#100E30", 800: "#14123A", 700: "#1D1A52", 600: "#2A2672", 500: "#3A3596" },
        // Electric Lavender
        lavender: { DEFAULT: "#9B6CFF", 200: "#DDD0FF", 300: "#C6B0FF", 400: "#AE8AFF", 500: "#9B6CFF", 600: "#7F4DF2", 700: "#6335CF" },
        // Frosted Periwinkle
        periwinkle: { DEFAULT: "#C7CEFF", 100: "#E8EBFF", 200: "#D9DEFF", 300: "#C7CEFF", 400: "#A9B3FA", 500: "#8792EE" },
        // Airy Calm
        airy: { DEFAULT: "#F3F5FF", 50: "#FAFBFF", 100: "#F3F5FF" },
        ink: { DEFAULT: "#14123A", soft: "#4A4876", faint: "#6F6D97" },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
        display: ['"Bricolage Grotesque Variable"', '"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      maxWidth: { page: "76rem" },
      boxShadow: {
        frost: "0 1px 0 rgba(255,255,255,.8) inset, 0 12px 32px -16px rgba(42,38,114,.28)",
        lift: "0 24px 48px -24px rgba(42,38,114,.38)",
      },
    },
  },
  plugins: [],
};
