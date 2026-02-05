/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    { pattern: /^(border-l-figma-|fill-figma-|text-figma-)(red|orange|purple|blue|green)$/ },
  ],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#000000',
        'dark-gray': '#000000',
        'light-gray': '#e5e5e5',
        'muted-gray': '#999999',
        accent: '#6b7280',
        figma: {
          red: '#FF001D',
          orange: '#FC7431',
          purple: '#A259FF',
          blue: '#0AC8FA',
          green: '#0ECD98',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Noto Sans Mono', 'monospace'],
      },
      keyframes: {
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'ticker-scroll': 'ticker-scroll 90s linear infinite',
      },
    },
  },
  plugins: [],
}
