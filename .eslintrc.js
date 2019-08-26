module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["node"],
  rules: {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      files: ["*.js", ".*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["*.ts"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "plugin:prettier/recommended",
      ],
      globals: {
        "jest/globals": true,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
      },
      plugins: ["@typescript-eslint", "jest", "prettier"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/interface-name-prefix": ["off"],
        "@typescript-eslint/member-delimiter-style": ["off"],
        "@typescript-eslint/type-annotation-spacing": ["off"],
      },
    },
  ],
};
