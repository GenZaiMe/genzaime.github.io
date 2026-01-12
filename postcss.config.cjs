/**
 * ファイル: /postcss.config.cjs
 * 役割: Tailwind/PostCSS を動かすための設定
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production"
      ? { cssnano: { preset: "default" } }
      : {})
  }
};
