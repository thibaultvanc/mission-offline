<template>
  <v-footer id="core-footer" absolute height="82" class="white">
    <!--    <div class="footer-items">
      <span v-for="link in links" :key="link.name">
        <a :href="link.Link" class="tertiary--text footer-links">{{
          link.name
        }}</a>
      </span>
    </div> -->
    <v-spacer />

    <!--   <v-btn
      v-for="locale in availableLocales"
      :key="locale.code"
      flat
      small
      color="primary"
      :to="switchLocalePath(locale.code)"
      >{{ locale.name }}</v-btn
    > -->

    <v-spacer />
    <!-- <nuxt-link to="/theme">Theme</nuxt-link> -->
    <v-spacer />
    <span class="font-weight-light copyright">
      <v-spacer />
      <img src="/img/logo/logo.png" style="height:50px" /> MissionOffline &copy;
      <span> {{ $moment().format('dddd Do MMMM YYYY, HH:mm') }}</span>
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', Link: '/dashboard' },
      { name: 'Creative Tim', Link: 'https://www.creative-tim.com' },
      { name: 'About Us', Link: 'https://creative-tim.com/presentation' },
      { name: 'Blog', Link: 'https://blog.creative-tim.com' }
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
