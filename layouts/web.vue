<template>
  <v-app>
    <v-toolbar :clipped-left="clipped" fixed app class="primary">
      <!--  <v-toolbar-side-icon @click="drawer = !drawer" />



      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn> -->
      <!--   <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn> -->
      <!-- <v-toolbar-title v-text="title" /> -->
      <!-- max-height="20" -->
      <nuxt-link class="white--text " to="/">
        <!-- <img src="/img/logo/logo.png" height="50px" /> -->
        <h4>
          MissionOffline
        </h4>
        <!-- Phone Stock -->
        <!-- <img src="~/assets/img/logo.png" height="50px" /> -->
      </nuxt-link>

      <!-- {{ my_global_config }} -->

      <v-spacer />
      <div v-if="$auth.$state.loggedIn" class="mx-5">
        <NuxtLink class="white--text" to="/admin">{{
          $t('interfaces.goToAdmin')
        }}</NuxtLink>
      </div>
      <template v-if="$auth.$state.loggedIn">
        <div class="">
          {{ $t('welcome') }} {{ $auth.user.name }}
          &nbsp; &nbsp;
          <button class="btn" @click="$auth.logout()">
            <v-icon class="white--text">mdi-power</v-icon>
            <!-- {{ $t('auth.logout.action') }} -->
          </button>
        </div>
      </template>
      <template v-else>
        <nuxt-link
          v-show="$route.name !== 'auth-login'"
          class="white--text"
          to="/auth/login"
          >{{ $t('auth.login.action') }}</nuxt-link
        >

        <!--  <nuxt-link class="white--text mx-3" to="/auth/register">{{
          $t('auth.register.action')
        }}</nuxt-link> -->
      </template>
    </v-toolbar>
    <v-content>
      <!-- {{ $store.state.app.drawer }} -->

      <nuxt />
    </v-content>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer :fixed="fixed" app class="white">
      <span>&copy; AdnProtection {{ $moment().format('YYYY') }}</span>

      <!--    <nuxt-link
        v-for="locale in availableLocales"
        :key="locale.code"
        class="mx-3"
        :to="switchLocalePath(locale.code)"
        >{{ locale.name }}</nuxt-link
      >
 -->
      <v-spacer></v-spacer>

      <!-- <nuxt-link to="/theme">Theme</nuxt-link> -->

      <v-spacer></v-spacer>

      {{ $moment().format('dddd Do MMMM YYYY, HH:mm') }}

      <!-- <NuxtLink
        v-if="$i18n.locale === 'en'"
        :to="`/fr` + $route.fullPath"
        active-class="none"
        exact
      >
        {{ $t('links.french') }}
      </NuxtLink>
      <NuxtLink
        v-else
        :to="$route.fullPath.replace(/^\/[^\/]+/, '')"
        active-class="none"
        exact
      >
        {{ $t('links.english') }}
      </NuxtLink> -->

      <!-- <v-time-picker v-model="picker" :landscape="landscape"></v-time-picker> -->
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import BaseBtn from '@/components/Themes/front/base/Btn'
import BaseHeading from '@/components/Themes/front/base/Heading'
import BaseSubheading from '@/components/Themes/front/base/Subheading'
import BaseText from '@/components/Themes/front/base/Text'
import BaseBubble1 from '@/components/Themes/front/base/Bubble1'
import BaseBubble2 from '@/components/Themes/front/base/Bubble2'

Vue.component('BaseBtn', BaseBtn)
Vue.component('BaseHeading', BaseHeading)
Vue.component('BaseSubheading', BaseSubheading)
Vue.component('BaseText', BaseText)
Vue.component('BaseBubble1', BaseBubble1)
Vue.component('BaseBubble2', BaseBubble2)

export default {
  data() {
    return {
      picker: null,
      landscape: false,

      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'work',
          title: 'Projects',
          to: '/projects'
        },
        {
          icon: 'sentiment_satisfied_alt',
          title: 'Clients',
          to: '/clients'
        },
        {
          icon: 'bubble_chart',
          title: 'Pointages',
          to: '/pointages'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
      // title: 'Vuetify.js'
    }
  },

  methods: {
    changeLocale(locale) {
      this.$vuetify.lang.current = locale
    }
  }
}
</script>
