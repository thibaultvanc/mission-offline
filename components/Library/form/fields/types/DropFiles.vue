<template>
  <dropzone :ref="id" :options="options" :destroyDropzone="true"></dropzone>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
 
export default {
  components: {
    Dropzone
  },
  computed: {
    id() {
      return 'dropzone' + Math.floor(Math.random() * 200) + 1
    }
  },
  data() {
    return {
      // See https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/props
      options: {
        url: "http://httpbin.org/anything"
      }
    }
  },
  mounted() {
    // Everything is mounted and you can access the dropzone instance
    const instance = this.$refs.el.dropzone
  }
}
</script>
