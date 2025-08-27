const proxies = [
  'mns',
  'marketing-product',
  'stat',
  'stat1',
  'marketing-api',
  'marketing-course',
  'shorter',
  'strategy_engine',
  'finance/sina',
  'newHttp',
  'http',
  'file-system',
  'gridTrade/grid_trade',
  'etf_index',
  'support/fina',
  'uc-system',
  'aip_data',
  'admin',
  'activity-system',
  'jg-marketing-uc',
  'marketing-activity',
  'marketing-material',
  'grid_etf',
  'tools',
  'marketing-fund',
]

const baseUrl = 'https://yx.fullgoalservice.com.cn'

const ProxyObject = proxies.reduce((acc, p) => {
  acc[`/${p}`] = {
    target: `${baseUrl}/${p}`,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      [`^/${p}`]: '',
    },
  }
  return acc
}, {})

console.log('ProxyObject-', ProxyObject)

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-nuxt2',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        hid: 'wx',
        src: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
        type: 'text/javascript',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'vant/lib/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    // '@/plugins/vant',
    {
      src: '@/plugins/vconsole',
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  // Proxy configuration
  proxy: {
    ...ProxyObject,
  },

  // target: 'static',

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   // See https://github.com/nuxt-community/axios-module#options
  //   proxy: true,
  //   credentials: true,
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vant'],
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'vant',
            // libraryDirectory: 'es',
            style: true,
          },
          'vant',
        ],
      ],
    },
  },

  // Router configuration
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/h5-miniprogram',
        component: resolve(__dirname, 'pages/h5&miniprogram.vue'),
      })
    },
  },
}
