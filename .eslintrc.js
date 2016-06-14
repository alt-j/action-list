module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        mocha: true
    },
    globals: {
        chai: true,
        sinon: true,
        module: true
    },
    parserOptions: {
        "sourceType": "module",
    },
    rules: {
        // http://eslint.org/docs/rules/#possible-errors
        'comma-dangle': [2, 'never'],
        'no-cond-assign': [2, 'always'],
        'no-console': 2,
        'no-debugger': 2,
        'no-dupe-args': 2,
        'no-dupe-keys': 2,
        'no-empty-character-class': 2,
        'no-ex-assign': 2,
        'no-extra-semi': 2,
        'no-func-assign': 2,
        'no-inner-declarations': 2,
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-negated-in-lhs': 2,
        'no-obj-calls': 2,
        'no-sparse-arrays': 2,
        'no-unexpected-multiline': 2,
        'no-unreachable': 2,
        'use-isnan': 2,
        'valid-typeof': 2,

        // http://eslint.org/docs/rules/#best-practices
        'array-callback-return': 2,
        'block-scoped-var': 2,
        'curly': 2,
        'dot-location': [2, 'property'],
        'dot-notation': 2,
        'eqeqeq': 2,
        'no-extend-native': 2,
        'no-alert': 2,
        'no-caller': 2,
        'no-case-declarations': 2,
        'no-empty-pattern': 2,
        'no-eq-null': 2,
        'no-eval': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-label': 2,
        'no-floating-decimal': 2,
        'no-implicit-coercion': 2,
        'no-implicit-globals': 2,
        'no-implied-eval': 2,
        'no-iterator': 2,
        'no-lone-blocks': 2,
        'no-loop-func': 0,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-native-reassign': 2,
        'no-new': 2,
        'no-new-func': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-proto': 2,
        'no-redeclare': 2,
        'no-return-assign': [2, 'always'],
        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-throw-literal': 2,
        'no-unused-expressions': 2,
        'no-unused-labels': 2,
        'no-useless-call': 2,
        'no-useless-concat': 2,
        'no-void': 2,
        'no-with': 2,
        'radix': 2,
        'wrap-iife': [2, 'inside'],
        'yoda': [2, 'never'],

        // http://eslint.org/docs/rules/#strict-mode
        'strict': [2, 'safe'],

        // http://eslint.org/docs/rules/#variables
        'no-delete-var': 2,
        'no-undef': 2,
        'no-undef-init': 2,
        'no-unused-vars': 2,
        'no-use-before-define': [2, {functions: false}],

        // http://eslint.org/docs/rules/#stylistic-issues
        'array-bracket-spacing': [2, 'never'],
        'brace-style': [2, '1tbs'],
        'camelcase': 2,
        'comma-spacing': [2, {before: false, after: true}],
        'comma-style': [2, 'last'],
        'computed-property-spacing': [2, 'never'],
        'consistent-this': [2, '_this'],
        'eol-last': 2,
        'indent': [2, 4, {SwitchCase: 1}],
        'key-spacing': [2, {beforeColon: false, afterColon: true}],
        'keyword-spacing': [2, {before: true, after: true}],
        'linebreak-style': [2, 'unix'],
        'max-len': [2, {code: 120, ignoreUrls: true}],
        'new-cap': [2, {capIsNew: false}],
        'new-parens': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-multiple-empty-lines': [2, {max: 1, maxEOF: 0}],
        'no-spaced-func': 2,
        'no-trailing-spaces': 2,
        'no-whitespace-before-property': 2,
        'object-curly-spacing': [2, 'never'],
        'one-var': [2, 'never'],
        'one-var-declaration-per-line': [2, 'always'],
        'operator-linebreak': [2, 'after'],
        'quote-props': [2, 'as-needed'],
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': [2, {anonymous: 'always', named: 'never'}],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'space-unary-ops': [2, {words: true, nonwords: false}],

        // http://eslint.org/docs/rules/#ecmascript-6
        'arrow-parens': [2, 'always'],
        'arrow-spacing': [2, {before: true, after: true}],
        'constructor-super': 2,
        'no-class-assign': 2,
        'no-const-assign': 2,
        'no-dupe-class-members': 2,
        'no-this-before-super': 2,
        'no-var': 2,
        'prefer-arrow-callback': 2,
        'prefer-const': 2,
        'template-curly-spacing': [2, 'never'],
        'yield-star-spacing': [2, 'after']
    }
};