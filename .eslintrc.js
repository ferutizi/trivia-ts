module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    './node_modules/ts-standard/eslintrc.json'
  ],
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx'
      ],
      rules: {
        quotes: [
          'error',
          'single'
        ]
      }
    }
  ],
  parserOptions: {
    project: [
      './tsconfig.json'
    ],
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/semi': 'off',
    'react/react-in-jsx-scope': 'off'
  }
}
