module.exports = {
  content: ["./**/*.php", "./src/**/*.js"],
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
