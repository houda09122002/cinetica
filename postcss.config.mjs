/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'tailwindcss/nesting': {}, // Active les règles imbriquées
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
