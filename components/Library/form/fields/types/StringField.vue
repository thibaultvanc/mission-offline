<template>
  <div>
    <!-- <pre><span class="m-5">value</span> :: {{ value }}</pre> -->
    <v-text-field
      browser-autocomplete="off"
      :value="value"
      :label="placeholder"
      :error-messages="errors"
      @input="e => $emit('input', e)"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number], // Number pour me dé&bloquer. à enlever
      required: false,
      default: null
    },
    placeholder: {
      type: String,
      required: true,
      default: ''
    },
    errors: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>
