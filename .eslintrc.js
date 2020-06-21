module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    extends: [
        '@moxy/eslint-config-babel',
        '@moxy/eslint-config-base/esm',
        '@moxy/eslint-config-jest',
        '@moxy/eslint-config-react-web-a11y',
        '@moxy/eslint-config-react',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    ],
    plugins: ['eslint-plugin-import'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
        'react/jsx-fragments': 'off',
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
        {
            files: ['*.tsx'],
            rules: {
                'react/prop-types': 'off',
            },
        },
    ],
};
