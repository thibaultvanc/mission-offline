<template>
  <div>
    <!-- <pre class="mt-5"><b>options :</b> {{options}}</pre> -->
    <!-- <pre class="mt-5"><b>value :</b> {{value}}</pre> -->
    <vue-dropzone
      :id="id"
      :ref="id"
      :options="options"
      @vdropzone-success="successEvent"
      @vdropzone-removed-file="removeEvent"
    ></vue-dropzone>

    <i> Taille limite par fichier : {{ options.maxFilesize }} Mo </i>
    <!-- <pre><span class="m-5">value</span> :: {{ value }}</pre> -->
    <!-- <v-text-field
      browser-autocomplete="off"
      :value="value"
      :label="placeholder"
      :error-messages="errors"
      @input="e => $emit('input', e)"
    ></v-text-field> -->
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'MediaFilesInput',
  components: {
    vueDropzone: vue2Dropzone
  },
  props: {
    value: {
      type: [Array],
      required: false,
      default: () => []
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
    },
    options: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  computed: {
    id() {
      return 'dropzone' + Math.floor(Math.random() * 200) + 1
    }
  },
  methods: {
    successEvent(file, response) {
      this.value.push(response.data)
      this.$emit('input', this.value)
    },
    removeEvent(file) {
      const aa = this.value.filter(fileUploaded => {
        return !this.camelCase(fileUploaded)
          .toLowerCase()
          .includes(this.camelCase(file.name).toLowerCase())
      })
      this.$emit('input', aa)
    },

    clearInput() {
      // called by IForm when submit is ok
      this.$refs[this.id].removeAllFiles()
    }
  }
}
</script>
