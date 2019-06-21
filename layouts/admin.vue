<template>
  <v-app>
    <!-- <core-filter /> -->

    <core-toolbar />

    <core-drawer :links="links" />

    <v-content>
      <div id="core-view">
        <v-fade-transition mode="out-in">
          <nuxt />
        </v-fade-transition>
      </div>

      <core-footer v-if="$route.name !== 'theme-Maps'" />

      <v-snackbar
        v-model="showSnack"
        :bottom="snackbar.y === 'bottom'"
        :left="snackbar.x === 'left'"
        :multi-line="snackbar.mode === 'multi-line'"
        :right="snackbar.x === 'right'"
        :timeout="snackbar.timeout"
        :top="snackbar.y === 'top'"
        :vertical="snackbar.mode === 'vertical'"
        :color="snackbar.color"
      >
        {{ snackbar.text }}
        <v-btn
          color="pink"
          flat
          @click="$store.commit('layout/setSnackbar', { show: false })"
        >
          Fermer
        </v-btn>
      </v-snackbar>
    </v-content>
    <!-- <core-view /> -->
  </v-app>
</template>

<script>
import Vue from 'vue'

import MaterialCard from '@/components/Themes/admin/material/Card'
import MaterialChartCard from '@/components/Themes/admin/material/ChartCard'
import MaterialNotification from '@/components/Themes/admin/material/Notification'
import MaterialStatsCard from '@/components/Themes/admin/material/StatsCard'
import CoreDrawer from '@/components/Themes/admin/core/Drawer'
import CoreFilter from '@/components/Themes/admin/core/Filter'
import CoreFooter from '@/components/Themes/admin/core/Footer'
import CoreToolbar from '@/components/Themes/admin/core/Toolbar'
import HelperOffset from '@/components/Themes/admin/helper/Offset'
import TypeEffect from '@/components/Library/effect/TypeEffect/TypeEffect.vue'

Vue.component('MaterialCard', MaterialCard)
Vue.component('MaterialChartCard', MaterialChartCard)
Vue.component('MaterialNotification', MaterialNotification)
Vue.component('MaterialStatsCard', MaterialStatsCard)
Vue.component('CoreDrawer', CoreDrawer)
Vue.component('CoreFilter', CoreFilter)
Vue.component('CoreFooter', CoreFooter)
Vue.component('CoreToolbar', CoreToolbar)
Vue.component('HelperOffset', HelperOffset)
Vue.component('TypeEffect', TypeEffect)

export default {
  middleware: ['admin'],
  data() {
    // todo
    return {
      links: [
        {
          to: '/admin',
          icon: 'mdi-webpack',
          text: 'Chantiers'
        }
      ]
    }
  },
  computed: {
    snackbar() {
      return this.$store.state.layout.snackbar
    },
    // ...mapState('layout', ['image', 'color']),
    showSnack: {
      get: function() {
        return this.$store.state.layout.snackbar.show
      },
      set: function(value) {
        // console.log('setter called with value', value)
        // alert('1')
        this.$store.commit('layout/setSnackbar', { show: value })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
#core-view {
  padding-bottom: 100px;
}
</style>
