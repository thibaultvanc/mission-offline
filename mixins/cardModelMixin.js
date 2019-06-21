export default {
  mounted() {
    this.defineCardChildren()
  },
  data() {
    return {
      loading: false,
      cardChildren: []
    }
  },
  props: {
    value: {
      type: [Number, Object],
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

    loads: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.loading = true
        if (typeof newValue === 'number') {
          // fetch the record then assign the value to the variable name
          console.log(this.$models[this.model])
          this.fetch(newValue)
            .then(object => {
              this[this.variable] = object
              this.loading = false
            })
            .catch(error => {
              console.log('error', error)
              alert('error psdf155qqqde78822')
              this.loading = false
            })
        } else {
          // console.clear()
          console.log('this.local_loads', this.local_loads)
          console.log('this.loads', this.loads)
          const needToFetch = true
          if (needToFetch) {
            const id = newValue[newValue.primaryKey()]
            /// alert(id)
            this.fetch(id).then(object => {
              this[this.variable] = object
              this.loading = false
            })
          } else {
            this[this.variable] = newValue
            this.loading = false
          }
          // on recupere l'objet donné. on
          // alert('local_loads' + this.local_loads)
        }
      }
    }
  },

  computed: {
    areCardChildrenLoaded() {
      // ici l'idée est de recuperer composansts de type CArd et afficher cette card que lorsque les card enfants sont loaded
      this.cardChildren.forEach(child => {
        console.log('child', child)
      })
    },
    variable() {
      return this.model_variable_name
        ? this.model_variable_name
        : this.snakeCase(this.model)
    }
  },
  methods: {
    fetch(id) {
      const mergeLoads = this.loads.concat(this.local_loads)
      console.log('mergeLoads', mergeLoads)

      // console.log(mergeLoads)

      return new Promise((resolve, reject) => {
        this.$models[this.model]
          .include(mergeLoads)
          .find(id)
          .then(object => {
            resolve(object)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    defineCardChildren() {
      console.log('======', this.$root.$children[0])

      /* this.cardChildren = this.$root.$children.forEach(child => {
        console.log('child', child)
      }) */

      /*  if (this.$children.length) {
      } */
    },

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
