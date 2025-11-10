// @ts-nocheck

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import next from "@next/eslint-plugin-next";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config([
  {
    ignores: ["node_modules", ".next", "dist"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      react,
      next,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended, // ✅ новий синтаксис ESLint 9
      next.configs.recommended,
      prettierConfig, // ✅ підключаємо Prettier як flat-config
    ],
    rules: {
      "react/react-in-jsx-scope": "off", // не потрібно в Next.js
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
    },
  },
]);
