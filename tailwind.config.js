/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1A1A',
          dark: '#0D0D0D',
          light: '#333333',
        },
        secondary: {
          DEFAULT: '#F5F5F7',
          light: '#FFFFFF',
        },
        accent: {
          red: '#FF4757',
          green: '#2ED573',
          orange: '#FFA502',
          blue: '#3742FA',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'default': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'lg': '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'sm': '4px',
        'default': '8px',
        'lg': '16px',
      },
    },
  },
  plugins: [],
}