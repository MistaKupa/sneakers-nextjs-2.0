/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // safelist: [
  //   // Colors used dynamically
  //   "bg-red-600",
  //   "bg-blue-800",
  //   "bg-lime-400",
  //   "bg-black",
  //   "bg-purple-700",
  //   "bg-cyan-500",
  //   "text-emerald-500",
  //   "text-red-600",
  //   "text-lime-400",
  //   "text-purple-700",
  //   "border-red-600",
  //   "border-lime-400",
  //   "border-purple-700",
  // ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        orange: "hsl(26, 100%, 55%)",
        orangePale: "hsl(25, 100%, 70%)",
        dark: {
          600: "hsl(220, 12%, 12%)",
          500: "hsl(220, 13%, 13%)",
          400: "hsl(219, 9%, 45%)",
          300: "hsl(220, 14%, 75%)",
          200: "hsl(223, 64%, 98%)",
          100: "hsl(0, 0%, 100%)",
        },
        newPrimary: "#C69DD5",
        newPrimaryGradient: "#e6bff5",
        newPrimaryHover: "#8880ff",
        newWhite: "#F5F5F5",
        lightBox: "hsl(0, 0%, 0%)",
      },
      backgroundSize: {
        25: "25%",
        40: "40%",
        50: "50%",
        75: "75%",
      },

      backgroundImage: {
        sustainability: "url('/shoesLanding/Landing_Sustainability.jpg')",
      },
    },
  },
  plugins: [],
};
