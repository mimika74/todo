module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
      "plugin:vue/vue3-essential",
      "plugin:import/typescript",
  ],
  overrides: [
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module"
  },
  plugins: [
    "import",
    "@typescript-eslint"
  ],
}
