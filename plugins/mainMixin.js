import Vue from 'vue'

import snakeCase from 'lodash.snakecase'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'
// import pluralize from 'pluralize'
// const Distance = require('geo-distance')
// console.log('' + Distance('50 km').human_readable('customary'))

Vue.mixin({
  data() {
    return {
      my_global_config: 'This'
    }
  },
  computed: {
    debug() {
      // alert(this.$store.state.layout.debug)
      return this.$store.state.layout.debug
      /*
      const valueFormEnv = process.env.DEBUG
      if (valueFormEnv === 'true') {
        return true
      } else if (valueFormEnv === 'false') {
        return false
      } else {
        throw new Error('DEBUG Not defined correctyu in the ENVS')
      }
      */
    },

    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }

    // inRange() {
    //  // return 'test'
    //  /// vue-geolocation-api
    //  // const coords = this.$geolocation.coords
    //  // if (!coords) return '?'
    //  // return Distance.between(coords, this.destination) > 150
    // }
  },
  created: function() {
    // console.log('mixin hook called')
  },
  methods: {
    alert(msg) {
      alert(msg)
    },
    changeLocale(locale) {
      this.$vuetify.lang.current = locale
    },

    snakeCase(text, separator = '-') {
      return snakeCase(text).replace('_', separator)
    },
    camelCase(string) {
      return camelCase(string)
    },
    ucfirst(string) {
      return upperFirst(string)
    },
    go(url, isBlank) {
      if (isBlank) {
        window.open(url, '_blank')
      } else {
        alert('pas')
        window.open(url)
      }
    }
  }
})
