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
      colors: {
        'base-footer': '#758695',
        'base-input': '#c4c6cd',
        'base-bg': '#F7F9FB',
        'base-bg-300': '#F7F9FB88',
        'base-typo': '#44474c',
      },
      width: {
        '1440': '1440px',
        '1680': '1680px',
        'fhd': '1920px',
        'hd': '1280px',
        'qhd': '2560px',
        'screen': '100dvw',
      },
      height: {
        // 9/16 * width
        '1440': '810px',
        '1680': '945px',
        'fhd': '1080px',
        'hd': '720px',
        'qhd': '1440px',
        'screen': '100dvh',
        'screen-minus-footer': 'calc(100dvh - 130px)',
      },
      maxWidth: {
        '1440': '1440px',
        '1680': '1680px',
        'fhd': '1920px',
        'hd': '1280px',
        'qhd': '2560px',
        'screen': '100dvw',
      },
      maxHeight: {
        '1440': '810px',
        '1680': '945px',
        'fhd': '1080px',
        'hd': '720px',
        'qhd': '1440px',
        'screen': '100dvh',
      },
      minWidth: {
        '1440': '1440px',
        '1680': '1680px',
        'fhd': '1920px',
        'hd': '1280px',
        'qhd': '2560px',
        'screen': '100dvw',
      },
      minHeight: {
        '1440': '810px',
        '1680': '945px',
        'fhd': '1080px',
        'hd': '720px',
        'qhd': '1440px',
        'screen': '100dvh',
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