<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img :src="image" height="100%" style="cursor:default">
      <div class="text-xs-center my-3">
        <h2>
          <nuxt-link class="white--text" to="/">
            MissionOffline
            <!-- <img src="~/assets/img/logo.png" height="50px" /> -->
          </nuxt-link>
        </h2>
        <!-- <img src="~/assets/img/logo.png" height="50px" /> -->
      </div>
      <!-- <v-img :src="logo" height="34" aspet-ratio="0.5" /> -->

      <v-list class="fill-height pt-2">
        <v-list-tile v-if="responsive">
          <!-- 123
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          /> -->
        </v-list-tile>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text" />
        </v-list-tile>
      </v-list>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from 'vuex'

export default {
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    logo: '/img/logo/logo.png',

    responsive: false
  }),
  computed: {
    ...mapState('layout', ['image', 'color']),
    inputValue: {
      get() {
        return this.$store.state.layout.drawer
      },
      set(val) {
        this.setDrawer(val)
      }
    },
    items() {
      return this.$t('Layout.View.items')
    }
  },
  mounted() {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('layout', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
