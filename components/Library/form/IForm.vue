<template>
  <v-form @submit.prevent="submit">
    <!-- <pre><span class="m-5">loads</span> :: {{ loads }}</pre> -->
    <!-- <pre><span class="m-5">form</span> :: {{ form }}</pre> -->
    <!--  <pre><span class="m-5">loadsin I*FORM</span> :: {{ loads }}</pre> -->
    <!--
        <pre class="mt-5"><b>value :</b> {{value}}</pre>

       <pre><span class="m-5">errors</span> :: {{ errors }}</pre> -->
    <!-- <pre><span class="m-5">value</span> :: {{ value }}</pre> -->
    <!-- <pre><span class="m-5">Classe Js</span> :: {{ form.constructor.name }}</pre> -->
    <!-- @input="() => submit('1232132132132')" -->
    <!-- <pre class="mt-5"><b>Form Class :</b> {{form.constructor.name}}</pre>
    <pre class="mt-5"><b>mode :</b> {{mode}}</pre> -->

    <!-- 
      REMETTRE LE FAKE ICI !!!!!!!!!!

    -->

    <div v-show="debug" class="text-xs-right ">
      <v-btn color="default" @click="fake">{{ $t('actions.fake') }}</v-btn>
    </div>

    <!--   <pre><span class="m-5">value</span> :: {{ value }}</pre> -->

    <!-- <pre><span class="m-5">form</span> :: {{ form }}</pre> -->
    <slot
      :form="form"
      :errors="errors"
      :cancel="cancel"
      :submit="submit"
    ></slot>

    <div v-show="!$parent.hideFooter" class="text-xs-right">
      <v-btn v-show="!loadingSubmit" color="default" @click="cancel">
        {{ $t('actions.cancel') }}
      </v-btn>

      <v-btn :loading="loadingSubmit" color="primary" @click="submit">
        <span v-show="mode === 'create'">{{ $t('actions.save.create') }}</span>
        <span v-show="mode === 'update'">{{ $t('actions.save.update') }}</span>
      </v-btn>

      <v-alert v-if="!!submitError" type="error" :value="!!submitError.message">
        <h3 v-show="submitError.status !== 422">
          Error {{ submitError.status }}
        </h3>
        {{ submitError.message }}
        <v-btn small color="info" @click="showMoreError = !showMoreError"
          >En savoir plus</v-btn
        >
      </v-alert>
      <v-card
        v-show="showMoreError && !!submitError"
        class="grey lighten-2 pa-2 red--text"
      >
        <ul>
          <li v-for="(error, i) in errors" :key="i">
            <!-- <pre><span class="m-5">i</span> :: {{ i }}</pre> -->
            {{ error[0] }}
          </li>
        </ul>
      </v-card>

      <!--       <v-alert type="error" :value="!!errorCount">
        {{ errorCount }} {{ $t('form.errors.errorCount') }}
      </v-alert> -->
    </div>
  </v-form>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'IForm',
  model: {
    // prop: 'list',
    event: 'update'
  },
  props: {
    // list: { required: true, type: Array },
    // method: { required: true, type: String },
    model: { required: true, type: String },
    cleanFormAfterSubmit: { required: false, type: Boolean, default: false },
    value: { required: false, type: [Object, Number], default: () => {} },
    loads: { type: Array, default: () => [], required: false },
    values: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data() {
    return {
      showMoreError: false,
      errors: {},
      form: {},
      originalData: {},
      submitError: {},
      loadingSubmit: false
    }
  },
  computed: {
    errorCount() {
      return Object.keys(this.errors).length
    },
    mode() {
      // console.log('this.form', this.form.constructor.name)

      if (this.form.constructor.name === 'Object') {
        return 'create'
      }

      // console.log('this.form on determine mode', this.form)

      if (this.form.hasId()) {
        return 'update'
      } else {
        return 'create'
      }
    },
    Model() {
      return this.$models[this.model]
    }
  },
  watch: {
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
    value: {
      immediate: true,
      deep: true,
      handler(value, oldValue) {
        if (!value) {
          return this.constructForm()
        }

        // console.log('value.constructor.name', value.constructor.name)

        // liste des models
        // console.log('this.', Object.keys(this.$models))

        // if (Object.keys(this.$models).includes(value.constructor.name)) {
        // le model existe
        if (value.hasOwnProperty('id') && value.id) {
          // this.form =
          this.constructForm(value)
          // this.form = value
          // this.constructForm(value)
        }

        /* if (value.hasId()) {
          } */
        // }
        else {
          this.constructForm()
        }

        console.log('watch value changed', value)

        // alert('value changed in I Form')
        /*       if (value && typeof value === 'object') {
          console.log('value2', value)

          if (!Object.keys(this.originalData).length) {
            this.originalData = new this.Model(
              JSON.parse(JSON.stringify(value))
            )
          } else {
            console.log('value--->', value)
          }

          this.form = new this.Model(value)
          // this.form = value
          if (!this.form.hasId()) {
            this.constructForm()
          } else {
          }

          console.log('value detected (update)', this.form)

          // alert('value changed in I Form 2')
        } else {
          this.constructForm()
        }

        this.$emit('input', this.form) */
        // this.fetchData()
        // alert('value changed in IForm')
      }
    }
  },

  created() {
    // this.constructForm()
  },
  methods: {
    async fake() {
      const faked = await this.Model.fake()
      console.log(faked)

      this.fillFakeForm(faked)
    },

    constructForm(formData) {
      if (!formData) {
        formData = this.Model.form()

        if (this.values) {
          Object.entries(this.values).forEach(e => {
            console.log('e------->', e)
            formData[e[0]] = e[1]
          })
        }
      } else {
        // this.form = formData
        // this.form = new this.Model(formData)
        formData = new this.Model(formData)
      }

      console.log('constructForm ... RAZ')

      this.errors = {}
      console.log('this.Model', this.Model)

      // console.log('formData', formData)
      this.form = formData
      Object.entries(formData).forEach(elem => {
        this.$set(this.form, elem[0], elem[1])
      })

      /* let id = this.form
        if (typeof id === 'Object') {
            
        }
      const response = await this.Model.find(id)
      this.list = response.data */
    },
    fetchData: debounce(async function() {
      // const formData = {}

      try {
        if (this.mode === 'update') {
          const id = 999

          const response = await this.Model.find(id)
          const elem = response.data

          Object.assign(this.form, elem)
        }

        /* this.list = await this.Model[this.method]
          .params({
            search: this.search
          })()
          .get() */
      } catch (e) {
        alert('error')
      }
    }, 300),
    /*
    async fetchData() {
      console.log(debounce)

      try {
        this.list = await this.Model[this.method]() // .fetchList()
      } catch (e) {
        alert('error')
         console.error({
          statusCode: 503,
          message: 'Unable to fetch users'
        }) 
      }
    }, */

    fillForm(object) {
      Object.entries(object).forEach(elem => {
        this.form[elem[0]] = elem[1]
      })
    },
    fillFakeForm(object) {
      Object.entries(this.form).forEach(elem => {
        const prop = elem[0]
        const value = elem[1]
        if (value) {
          object[prop] = value
        }
      })
      this.form = object
    },

    cancel() {
      if (this.mode === 'create') {
        this.constructForm()
      } else if (this.mode === 'update') {
        this.fillForm(this.originalData)
      } else {
        alert('pb de mode de form')
      }
      this.errors = {}
      this.submitError = {}

      this.$emit('cancel', 'from iform')
    },

    findDropZoneFieldsToClear(children) {
      // console.log('this.$children', this.$children[0].$children)
      if (children.length) {
        children.forEach(child => {
          if (child._name === '<MediaFilesInput>') {
            console.log('child', child._name)
            console.log('child', child)
            child.clearInput()
          }
          this.findDropZoneFieldsToClear(child.$children)
        })
      }
    },

    async submit() {
      this.loadingSubmit = true
      this.submitError = {}

      console.log('this.form', this.form)
      console.log('this.loads', this.loads)
      try {
        const elem = await this.form.save()

        let elemWithLoads
        if (this.loads.length) {
          elemWithLoads = await this.Model.include(this.loads).find(elem.id)
        } else {
          elemWithLoads = await this.Model.find(elem.id)
        }

        console.log('elemWithLoads', elemWithLoads)
        elem.hydrateObject(elemWithLoads)
        this.$emit('input', elemWithLoads)
        // this.value = elemWithLoads
        this.loadingSubmit = false
        console.log('created : ', elemWithLoads)

        // console.log('this.form : ', this.form)

        // this.form = elem

        if (this.mode === 'create') {
          this.$emit('stored', elemWithLoads)
        } else if (this.mode === 'update') {
          console.log('1')

          this.$emit('updated', elemWithLoads)
          console.log('2')
        } else {
          alert('pb witho mode')
          // alert(this.$t('dev.library.iform.errors')) // todo : trans
        }
        this.errors = {}

        this.findDropZoneFieldsToClear(this.$children)

        this.$store.dispatch('layout/flash', 'Enregistré')
        // console.log('this.$children', this.$children[0].$children)
        // clearDropZone() {

        // }
      } catch (error) {
        this.loadingSubmit = false
        console.log('error', error)
        this.errors = error.response.data.errors
        this.submitError = {
          message: error.response.data.message,
          status: error.response.status,
          statusText: error.response.statusText
        }
        // this.errors = error.response.data.errors
        this.$store.dispatch('layout/error', error.response.data.message)
        console.log(error)
        console.log('error', error)
        console.log('error.response', error.response)

        // console.log('error', error.response.data.errors)
      }
    }

    /* toggleForm() {
      alert('11111111111')
      this.showForm = !this.showForm
    },
    clearInput() {
      this.input = ''
    },
    handleBackspace(e) {
      if (this.newElem.length === 0) {
        this.$emit('update', this.list.slice(0, -1))
      }
    } */
  }
  // render() {
  //    return this.$slots // .default({})
  //  }
}
</script>
