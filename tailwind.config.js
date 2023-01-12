module.exports = {
  content: ["./**/*.php", "./src/**/*.js", "./*.php"],
  theme: {
    extend:
    {
      fontFamily: {
        'anvirnext': ['Avenir LT Bold'],
        'anvirbold': ['Avenir Next Bold']
      },
      fontSize: {
        '4.5xl': '2.5rem'
      },
      spacing: {
        '4.5': '1.125rem',
        '7.5': '1.875rem',
        '15': '3.75rem',
      },
      borderRadius: {
        '4xl': '1.875rem'
      }
    },
  },
  plugins: [require("@tailwindcss/typography")]
}
