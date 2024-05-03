// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@ant-design-vue/nuxt",
  ],
  components: true,
  antd: {
        extractStyle: true,
    },
vite:{
  build: {
    cssMinify: "lightningcss",
    // minify: true,
    minify: "terser",
  },
}
})
