module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["@typescript-eslint", "react", "react-hooks", "unused-imports"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "prettier",
    ],
    rules: {
        /* 🔴 NÃO permitir any */
        "@typescript-eslint/no-explicit-any": "error",

        /* 🔴 NÃO permitir imports não usados */
        "unused-imports/no-unused-imports": "error",

        /* remove variáveis não usadas, mas permite _ */
        "unused-imports/no-unused-vars": [
            "warn",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            },
        ],

        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",

        "@typescript-eslint/consistent-type-imports": "error",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
s;
