import Vue from 'vue'
import moment from 'moment'

// window.moment = require('moment')

// Vue.use(moment)

const locale = 'fr'

if (locale === 'en') {
  require('moment/locale/en-ca')
} else if (locale === 'fr') {
  require('moment/locale/fr')
} else if (locale === 'ja') {
  require('moment/locale/ja')
} else if (locale === 'de') {
  require('moment/locale/de')
}

Vue.use(require('vue-moment'), {
  moment
})

export default ({ app }, inject) => {
  app.moment = moment
  inject('moment', moment)
}
