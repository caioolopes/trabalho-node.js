// eslint.config.js
module.exports = [
  {
    files: ["*.js", "src/**/*.js"], // ajuste conforme sua estrutura
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "prettier/prettier": "error",
    },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
  },
];