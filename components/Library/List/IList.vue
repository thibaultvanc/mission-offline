<script>
import debounce from 'lodash/debounce'
import listModelMixin from '@/mixins/listModelMixin'
export default {
  mixins: [listModelMixin],
  /* model: {
    // prop: 'list',
    event: 'update'
  }, */
  props: {
    /* value: {
      required: false,
      type: [Object, Number, Array],
      default: null
    },
    selection: { required: false, type: Boolean, default: false },
    multiple: { required: false, type: Boolean, default: false },
 */
    // list: { required: true, type: Array },
    method: { required: true, type: String },
    model: { required: true, type: String },
    formCmpnt: { required: true, type: Object },
    removeOnBackspace: { default: true, type: Boolean },

    givenList: { required: false, type: Array, default: () => [] },
    loads: { required: false, type: Array, default: () => [] },
    filters: { required: false, type: Object, default: () => {} }
  },
  data() {
    return {
      search: '',
      selected: null,
      ready: false,
      showForm: false,
      showCard: {},
      loading: false,
      input: '',
      list: []
    }
  },
  computed: {
    newElem() {
      return this.input.trim()
    },
    selectedIds() {
      if (this.multiple) {
        return this.selected.map(e => e.id)
      } else {
        return this.selected
      }
    }
  },
  watch: {
    multiple: {
      immediate: true,
      handler(value, oldValue) {
        if (value && !Array.isArray(this.selected)) {
          if (Array.isArray(value)) {
            this.selected = this.value
          } else {
            this.selected = this.value
          }
        } else {
          // alert('123sqsdqsd')
          // this.selected = []
        }
      }
    },
    model: {
      immediate: false,
      handler(value, oldValue) {
        this.fetchData()
      }
    },
    method: {
      immediate: false,
      handler(value, oldValue) {
        this.fetchData()
      }
    },
    search: {
      immediate: false,
      handler(value, oldValue) {
        this.fetchData()
      }
    },
    filters: {
      immediate: true,
      deep: true,
      handler(value, oldValue) {
        // alert('caught')
        this.fetchData()
      }
    }
  },

  mounted() {
    // console.log('this.givenList', this.givenList)
    if (this.givenList.length) {
      this.list = this.givenList
      this.ready = true
    } else {
      this.initFetchData()
    }
    // this.$on('cancel', () => alert('cancel'))
  },
  methods: {
    async initFetchData() {
      try {
        const response = await this.$models[this.model]
          [this.method](this.loads, this.filters)
          .get()
        this.list = response.data
        this.permissions = response.permissions
        console.log('->this.list', this.list)

        this.ready = true
      } catch (error) {
        console.log('e0', error)
        this.loading = false
        alert('error MMMMMP2sddfg8YTD166')
      }
    },

    fetchData: debounce(async function() {
      // alert('11')
      // console.log('this.loads', this.loads)
      // console.clear()
      /* console.log('----------------')
      console.log('----------------')
      console.log('this.$models', this.$models) */
      this.loading = true
      try {
        /*  console.log(
          this.$models[this.model][this.method](
            this.loads,
            this.filters.search(this.search)
          )
        ) */
        const response = await this.$models[this.model]
          [this.method](this.loads, this.filters)
          // .search(this.search)
          .where('search', this.search)
          .get()

        const list = response.data
        this.list = list
        /* if (list.length) {
          console.log('_______')
          console.log('this.list[0]', list[0])
          console.log('list[0]', list[0].constructor.name)
          console.log('is same', list[0].constructor.name === this.model)
          console.log('_______')

          // if (this.list[0].constructor.name !== this.model) {
          console.log('mapping')
          list = list.map(e => new this.$models[this.model](e.name))
          // }


          console.log('_______')
          console.log('this.list[0]', this.list[0])
          console.log('this.list[0]', this.list[0].constructor.name)
          console.log('is same', this.list[0].constructor.name === this.model)
          console.log('_______')
        } */

        this.permissions = response.permissions
        this.loading = false
      } catch (e) {
        console.log('e', e)
        this.loading = false
        alert('error !!123ueye8YTD12')
      }
    }, 500),
    /*
    async fetchData() {
      console.log(debounce)

      try {
        this.list = await this.$models[this.model][this.method]() // .fetchList()
      } catch (e) {
        alert('error')
         console.error({
          statusCode: 503,
          message: 'Unable to fetch users'
        }) 
      }
    }, */
    async removeElem(elem) {
      // console.log('elem', elem)

      const confirmed = confirm(this.$t('actions.delete.areUsure')) // todo : trans
      if (confirmed) {
        await elem.delete()
        this.list = this.list.filter(t => t !== elem)
      }
    },
    updateSearch(value) {
      this.search = value
    },

    show(elem) {
      this.showCard = elem
      // alert('show' + elem.id)
    },
    isItemSelected(elem) {
      if (this.multiple) {
        return this.selectedIds.includes(elem.id)
      } else {
        return this.selected.id === elem.id
      }
    },

    select(elem) {
      console.log('elem', elem)

      if (this.selection && this.multiple) {
        // alert('select')
        // const ids = this.selected.map(e => e.id)
        if (this.selectedIds.includes(elem.id)) {
          // alert('rem')
          this.selected = this.selected.filter(e => e.id !== elem.id) // todo : toggle
        } else {
          this.selected.push(elem) // todo : toggle
        }
      } else {
        this.selected = elem
      }
      // alert('emit')
      console.log('this.selected', this.selected.length)

      this.$emit('input', this.selected)
      // alert('show' + elem.id)
    },

    edit(elem) {
      // alert('edit' + this.showCard.id)
      // this.form = this.showCard
      // this.showCard = elem
      console.log('edit() this.showCard', this.showCard)
      console.log('edit() this.showCard', this.showCard)

      // this.showCard = elem
      this.toggleForm()
    },

    formCreated(createdElem) {
      console.log('createdElem revied', createdElem)
      this.list.unshift(createdElem)
      this.showForm = false
      this.showCard = {}
      // this.toggleForm()
    },
    formUpdated(updatedElem) {
      // alert('updated')
      console.log('updatedElem revied', updatedElem)
      const objIndex = this.list.findIndex(obj => obj.id === updatedElem.id)

      this.list[objIndex] = updatedElem
      // let finde = this.list.(e => e.id === updatedElem.id)
      // finde = updatedElem
      this.showForm = false
      this.showCard = {}
      // this.showCard = updatedElem
    },

    /* addElem() {
      alert('addElem ..................... ????')
      if (this.newElem.length === 0 || this.list.includes(this.newElem)) {
        return
      }
      this.$emit('update', [...this.list, this.newElem])
      this.clearInput()
    }, */
    toggleForm() {
      this.showForm = !this.showForm
      // this.formCmpnt.data.form = this.formCmpnt.props.value
    },
    closeCard() {
      this.showCard = {}
      /* if (!this.cleanFormAfterSubmit) {
          this.constructForm()
        } */
    },
    /*  clearInput() {
      this.input = ''
    }, */
    handleBackspace(e) {
      if (this.newElem.length === 0) {
        this.$emit('update', this.list.slice(0, -1))
      }
    }
  },
  render() {
    return this.$scopedSlots.default({
      list: this.list,
      removeElem: this.removeElem,
      search: this.search,
      showForm: this.showForm,
      showCard: this.showCard,
      toggleForm: this.toggleForm,
      closeCard: this.closeCard,
      updateSearch: this.updateSearch,
      ready: this.ready,
      loading: this.loading,
      show: this.show,
      isItemSelected: this.isItemSelected,
      edit: this.edit,
      select: this.select,
      selected: this.selected,
      permissions: this.permissions,

      formCreated: this.formCreated,
      formUpdated: this.formUpdated,
      loads: this.loads,
      // filters: this.filters,

      addElem: this.addElem,
      removeButtonEvents: elem => ({
        click: () => {
          this.removeElem(elem)
        }
      }),
      /* toggleForm: () => ({
        click: () => {
          this.showForm = !this.showForm
        }
      }), */
      searchProps: {
        value: this.search
      },
      inputProps: {
        value: this.input
      },
      inputEvents: {
        input: e => (this.input = e.target.value),
        keydown: e => {
          if (e.key === 'Backspace' && this.removeOnBackspace) {
            this.handleBackspace()
          }
          if (e.key === 'Enter') {
            e.preventDefault()
            this.addElem()
          }
        }
      }
    })
  }
}
</script>
