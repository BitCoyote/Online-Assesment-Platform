module.exports = {
  content: ["./**/*.php", "./src/**/*.js", "./*.php"],
  theme: {
    extend:
    {
      fontFamily: {
        'anvirnext': ['Avenir Next']
      },
    },
  },
  plugins: [require("@tailwindcss/typography")]
}
