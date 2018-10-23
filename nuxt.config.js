require('dotenv').config()

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  // ** Headers of the page
  head: {
    title: 'Aayulogic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'core.aayulogic.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/veeValidate.js',
    '~/plugins/axios.js',
    '~/plugins/vueApiQuery.js',
    '~/plugins/globalComponents.js',
    { src: '~/plugins/vueInfiniteLoading.js', ssr: false }
  ],

  css: [
    '~/assets/style/app.styl'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true,
    linkify: true,
    breaks: true
  },
  axios: {
    baseURL: 'http://localhost:8000/api/',
    debug: true
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/obtain-token/', method: 'post', propertyName: 'token' },
          user: { url: '/user/detail/me/', method: 'get', propertyName: false },
          logout: false
        },
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/accounts/login/',
      logout: '/accounts/login/',
      callback: '/accounts/login',
      home: '/'
    },
    rewriteRedirects: false,
    fullPathRedirect: false,
    localStorage: false
  },
  router: {
    middleware: ['auth']
  },
  layoutTransition: 'slide-x-transition',
  transition: {
    name: 'slide-x-transition'
  },
  // ** Customize the progress bar color
  loading: {
    color: '#3B8070',
    height: '5px'
  },
  // ** Build configuration
  build: {
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    // ** Run ESLint on save
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
