import IForm from '~/components/Library/form/IForm'
import IField from '~/components/Library/form/fields/IField'
export default {
  components: {
    IForm,
    IField
  },
  created() {},
  data() {
    return {}
  },
  props: {
    value: {
      type: [Number, Object],
      default: () => {},
      required: false
    },
    values: {
      type: Object,
      default: () => {},
      required: false
    },
    only: {
      default: () => [],
      type: Array,
      required: false
    },
    except: {
      default: () => [],
      type: Array,
      required: false
    },
    hideFooter: {
      type: Boolean,
      default: false,
      required: false
    },
    loads: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  /*   watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        alert('val changed')
        this.$emit('input', val)
      }
    }
  }, */
  computed: {
    onlyFilteredForChildForm() {
      if (this.only) {
        return this.only
          .filter(e => {
            return e.includes('.')
          })
          .map(e => {
            const temp = e.split('.')
            if (temp.length) {
              temp.shift()
              return temp.join('.')
              // temp =
            } else {
              return 'nope'
            }
          })
      }
      return []
    }
  },
  methods: {
    showField(fieldName) {
      if (this.except.length && this.only.length) {
        alert(
          this.module +
            ' : error on props : sorry you cannot have except AND only '
        )
      }

      if (this.except.length) {
        return !this.except.includes(fieldName)
      }
      if (this.only.length) {
        return this.only.includes(fieldName)
      }

      return true
    }
  }
}
