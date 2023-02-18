module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-undef": ["error", { "typeof": false }],
        "no-unused-vars": "off"
    },
    "globals": {
        "mediasFactory": true,
        "photographerFactory": true
    }
}
