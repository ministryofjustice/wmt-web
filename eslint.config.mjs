import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([globalIgnores(["njk_dev/**/*.js", "app/**/gov*.js"]), {
    languageOptions: {
        globals: {
            ...globals.wdio,
            $: "readonly",
            $$: "readonly",
            browser: "readonly",
            expect: "readonly",
        },
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
            sourceType: "module",
        },
    },
}]);