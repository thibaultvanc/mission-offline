import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'
require('dotenv').config()

export default {
	mode: 'spa',


	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
	},

	/*
	** Customize the progress-bar color
	*/
	loading:{ color: 'green' },

	/*
	** Global Css
  */
 css: ['~/assets/style/app.styl'],
	//css: [
		//'~/assets/css/tailwind.css',
		//'~/assets/css/transitions.css'
	//],


  env: {
    DEBUG: process.env.DEBUG,
    LARAVEL_ENDPOINT: process.env.LARAVEL_ENDPOINT,
    LARAVEL_UPLOAD_TIMEOUT_MILLISECOND:process.env.LARAVEL_UPLOAD_TIMEOUT_MILLISECOND,
    LARAVEL_UPLOAD_MAX_FILESIZE:process.env.LARAVEL_UPLOAD_MAX_FILESIZE,
    //laravel_endoint: process.env.LARAVEL_ENDPOINT
  },


	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'~/plugins/axios.js',
		'~/plugins/models.js',
		'~/plugins/vuetify.js',
    '~/plugins/moment',
    '~/plugins/mainMixin',
    '~/plugins/chartist',
    '~/plugins/bus',
  ],

	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/dotenv',
		'@nuxtjs/onesignal',
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		'@nuxtjs/pwa',
		['nuxt-i18n', {
      defaultLocale: 'fr',

      locales: [
        {
          code: 'en',
          name: 'english',
          file: 'en-US.js',
          iso: 'en-US'
        },
        {
          code: 'es',
          name: 'espagnol',
          file: 'es-ES.js',
          iso: 'es-ES'
        },
        {
          code: 'fr',
          name: 'français',
          file: 'fr-FR.js',
          iso: 'fr-FR'
        }
      ],
      lazy: true,
      strategy: 'prefix_except_default',
      defaultLocale: 'fr',
      langDir: 'lang/'
    }]
  ],



	/*
	** @nuxtjs/onesignal module configuration
	*/
	oneSignal: {
		init: {
            appId: process.env.ONESIGNAL_APP_ID,
            notifyButton: {
              enable: false
            },
            allowLocalhostAsSecureOrigin: true,
            welcomeNotification: {
                disable: true
            }
          }
	},

  /*
	** @nuxtjs/pwa module configuration
	*/
  workbox: {
    globPatterns: ['**/*.{js,css}', '**/img/*'],
    offlinePage: '/',
    offlineAssets: [
      '/img/drawer/lake-montain.jpg'
    ],
    runtimeCaching: [
      {
        urlPattern: 'https://adn-protection.organit.fr/api/auth',
        strategyOptions: {
          cacheName: 'auth'
        }
      },
      {
        urlPattern: 'https://adn-protection.organit.fr/api/chantier',
        strategyOptions: {
          cacheName: 'chantiers'
        }
      },
      {
        urlPattern: 'https://adn-protection.organit.fr/api/chantier/.*',
        strategyOptions: {
          cacheName: 'chantiers-details',
          cacheExpiration: {
            maxEntries: 50,
            maxAgeSeconds: 300
          }
        }
      }
    ]
  },


	/*
	** @nuxtjs/axios module configuration
	*/
	axios: {
		baseURL : process.env.LARAVEL_ENDPOINT
	},


	/*
	** @nuxtjs/auth module configuration
	*/
	auth: {
		strategies: {
            local: {
              endpoints: {
                login: {url: '/api/auth/login', method: 'post', propertyName: 'access_token'},
                logout: {url: '/api/auth/logout', method: 'post', },
                user: {url: '/api/auth', method: 'get', propertyName: 'user'},
              },
              tokenRequired: true,
              tokenType: 'Bearer',
            },
          },
          redirect: {
            login: '/auth/login',
            logout: '/',
            callback: '/auth/login',
            home: '/'
          }
	},




	/*
	**  module configuration
	*/
	router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
		//middleware: ['auth']
	},



    /*
    ** Build configuration
    */
    build: {

    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },



        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/,
                options: {
                    fix: true
                }
                })
            }
        }
    }
}
