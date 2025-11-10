import next from "@next/eslint-plugin-next";
import eslint from "@eslint/js";

export default [eslint.configs.recommended, next.configs["core-web-vitals"]];
