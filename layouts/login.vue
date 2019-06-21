<template>
  <v-app id="inspire">
    <v-content>
      <v-img :src="image" height="100vh" style="cursor:default">
        <v-layout row wrap>
          <v-flex xs12 md6>
            <h3 class="">
              <nuxt-link to="/" class="white--text">
                <img src="/img/logo/logo.png" height="50px" />
                MissionOffline
              </nuxt-link>
            </h3>
          </v-flex>
        </v-layout>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <nuxt />

                <!-- <nuxt-link
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  class="mx-3"
                  :to="switchLocalePath(locale.code)"
                  >{{ locale.name }}</nuxt-link
                > -->
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      image: '/img/background/boat_in_space.jpg'
    }
  },
  methods: {
    changeLocale(locale) {
      this.$vuetify.lang.current = locale
    }
  }
}
</script>
