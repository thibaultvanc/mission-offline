export default {
  data() {
    return {
      isActive: false
    }
  },
  beforeDestroy() {
    this.$bus.$off('toggleable.open', this.onActiveHandler)
  },
  mounted() {
    this.$bus.$on('toggleable.open', this.onActiveHandler)
  },
  methods: {
    onActiveHandler(payload) {
      if (this.$options.name === payload.name) {
        if (this.isActive) {
          this.dismiss()
          return
        }
        Object.assign(this.$data, this.$options.data())
        this.isActive = true
        if (this.onActive) {
          this.onActive(payload)
        }
      }
    },
    dismiss() {
      this.isActive = false
    }
  }
}
