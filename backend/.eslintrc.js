// Configurações do ESLint. Precisa ter a extensão instalada no VSCode
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  // Adivcionando o pretier às extensções e plugins
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // Configurando pra retornar error quando achar codigo fora do padrão
    "prettier/prettier": "error",
    // Tirando a obrigatoriedade de utilizar o this em metodos de classes
    "class-methods-use-this": "off",
    // permitir alterações em parâmetros
    "no-param-reassign": "off",
    // Tira a obrigatoriedade das variáveis serem camelCase
    "camelcase": "off",
    // Para que não reclame ao utilizar variáveis q não utilizarmos
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  },
};
