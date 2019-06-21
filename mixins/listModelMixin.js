export default {
  mounted() {},
  data() {
    return {
      // filters: {}
    }
  },
  props: {
    value: {
      required: false,
      type: [Object, Number, Array],
      default: null
    },
    selection: { required: false, type: Boolean, default: false },
    multiple: { required: false, type: Boolean, default: false },
    hideFilters: { required: false, type: Boolean, default: false },
    lineActions: { required: false, type: Array, default: () => [] },
    editable: { required: false, type: Boolean, default: true },
    where: { required: false, type: Object, default: () => {} },
    showSearch: { required: false, type: Boolean, default: true },
    showAddButton: { required: false, type: Boolean, default: true }
  },
  watch: {
    /*    value: {
      deep: true,
      immediate: false,
      handler(val) {
        // this.$emit(val)
      }
    } */
  },
  created() {
    if (this.filters) {
      this.filters = Object.assign(this.filters, this.where)
    }
  },
  computed: {},
  methods: {}
}
