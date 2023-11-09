module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-undef': "off",
        'no-unused-vars': "off",
        'no-empty': 'off',

        'vue/no-unused-vars': "off",
        'vue/no-unused-components': "off",
    }
}
