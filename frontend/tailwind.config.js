import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "24px",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        heading: ["Manrope", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      boxShadow: {
        sm: "0px 4px 20px rgba(10, 37, 64, 0.05)",
        md: "0px 12px 32px rgba(10, 37, 64, 0.12)",
      },
    },
  },
  // KUNCI PERUBAHAN: Masukkan seluruh opsi ke dalam parameter fungsi daisyui()
  plugins: [
    daisyui({
      themes: ["corporate"],
    })
  ],
}