<template>
  <div>
    <!-- FILE -->
    <component
      :is="fieldCmpt"
      v-if="type === 'file'"
      :value="value"
      :placeholder="placeholder"
      :errors="errorsToShow"
      :object-id="objectId"
      :endpoint="endpoint"
      :field="field"
      @input="val => changed(val)"
    ></component>

    <!-- media files -->
    <component
      :is="fieldCmpt"
      v-else-if="type === 'files'"
      :value="value"
      :placeholder="placeholder"
      :errors="errorsToShow"
      :endpoint="endpoint"
      :options="options"
      @input="val => changed(val)"
    ></component>

    <!-- Normal -->
    <component
      :is="fieldCmpt"
      v-else
      :value="value"
      :placeholder="placeholder"
      :errors="errorsToShow"
      @input="val => changed(val)"
    ></component>
  </div>
</template>

<script>
import StringField from '~/components/Library/form/fields/types/StringField.vue'
import FileField from '~/components/Library/form/fields/types/FileField.vue'
import Files from '~/components/Library/form/fields/types/Files.vue'

export default {
  components: {
    // StringField,
    // FileField
  },
  props: {
    // list: { required: true, type: Array },
    // name: { required: true, type: String },
    placeholder: { required: true, type: String },
    objectId: { required: false, type: [String, Number], default: null },
    endpoint: { required: false, type: String, default: '' }, // for single uploads
    field: { required: false, type: String, default: '' }, // for single uploads
    type: { required: true, type: String },
    model: { required: false, type: String, default: '' },
    value: {
      required: false,
      type: [String, Number, Array, Object],
      default: () => {}
    },
    errors: { required: true, type: Array },

    // selection

    form: { required: false, type: Object, default: () => {} },
    create: { required: false, type: Boolean, default: false },
    multiple: { required: false, type: Boolean, default: false },

    // vue2dropzone (files)
    options: {
      required: false,
      type: Object,
      default: () => {}
    }

    // model: { required: true, type: String }
  },
  data() {
    return {
      errorsToShow: []
    }
  },
  computed: {
    test() {
      // logic
      return this.type
    },
    fieldCmpt() {
      if (this.type === 'string') {
        return StringField
      }

      if (this.type === 'files') {
        if (!this.options) {
          return alert(this.$t('dev.errors.fields.files.needOptions'))
        }
        return Files
      } else if (this.type === 'file') {
        // if (!this.objectId) {
        //  return alert(this.$t('dev.errors.fields.upload.needObjectId'))
        // }
        if (!this.endpoint) {
          return alert(this.$t('dev.errors.fields.upload.needEndPoint'))
        }
        if (!this.field) {
          return alert(this.$t('dev.errors.fields.upload.needFieldName'))
        }

        return FileField
      } else {
        return StringField
      }
    }
  },
  watch: {
    /* value: {
      immediate: true,
      handler(value, oldValue) {
        if (this.errors.length) {
          // this.errorsToShow = []
        }
      }
    }, */
    errors: {
      immediate: false,
      handler(value, oldValue) {
        this.errorsToShow = value
      }
    }
  },
  methods: {
    changed(value) {
      console.log('value ', value)
      this.$emit('input', value)

      if (this.errors.length) {
        this.errorsToShow = []
      }
    }
  }

  /*   render() {
    return this.$scopedSlots.default({})
  } */
}
</script>
