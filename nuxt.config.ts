// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/icon"],
  css: ["@/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
