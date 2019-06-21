<template>
  <div class="mb-5">
    <!--  <vue-typer
      v-show="textArray.length"
      :text="textArray"
      :repeat="repeat"
      :shuffle="false"
      initial-action="typing"
      :pre-type-delay="70"
      :type-delay="70"
      :pre-erase-delay="2000"
      :erase-delay="23"
      erase-style="backspace"
      :erase-on-complete="false"
      caret-animation="smooth"
    ></vue-typer> -->
  </div>
</template>

<script>
// https://cngu.github.io/vue-typer/

// import { VueTyper } from 'vue-typer'

export default {
  components: {
    //    VueTyper
  },
  props: {
    repeat: {
      type: Number,
      default: 0
    },
    array: {
      // ['text1', 'text2']
      type: Array,
      default: () => []
    }
  },
  computed: {
    textArray() {
      const toReturn = this.array

      if (this.$slots.default) {
        if (this.$slots.default[0].text) {
          let slotContent = this.$slots.default[0].text
          slotContent = slotContent.trim()
          slotContent = slotContent.replace(/(<([^>]+)>)/gi, '') // StrippedString

          return [slotContent]
        }
      }

      return toReturn
    }
  }
}
</script>
