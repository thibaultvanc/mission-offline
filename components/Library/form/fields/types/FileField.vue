<template lang="html">
  <div>
    <v-layout row wrap>
      <v-flex v-if="placeholder" xs2>
        {{ placeholder }}
      </v-flex>
      <v-flex>
        <v-card flat>
          <v-progress-circular
            v-if="loading"
            :width="3"
            color="green"
            indeterminate
          ></v-progress-circular>

          <div class="">
            <div v-if="!data">
              <input class="ma-0" type="file" @change="onFileChange" />
            </div>
            <div v-else class="">
              <v-layout row wrap>
                <v-flex>
                  <!-- <pre>extension : {{data}}</pre> -->
                  <a target="_blank" :href="data">
                    <img
                      v-if="extensions.image.includes(extension)"
                      :src="data"
                      style="height:100px"
                    />
                    <img
                      v-if="extensions.word.includes(extension)"
                      src="/img/picto/word.png"
                      style="height:100px"
                    />
                    <img
                      v-if="extensions.pdf.includes(extension)"
                      src="/img/picto/pdf.png"
                      style="height:100px"
                    />
                  </a>
                </v-flex>
                <v-flex>
                  <v-btn small class="default" @click.prevent="removeImage">{{
                    $t('actions.changeFile')
                  }}</v-btn>
                </v-flex>
              </v-layout>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>

    <v-alert type="error" :value="errorsUpload.length">
      {{ errorsUpload[0] }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      requied: true,
      type: String,
      default: ''
    },
    rules: {
      requied: true,
      default: () => [],
      type: Array
    },
    endpoint: {
      requied: true,
      type: String,
      default: ''
    },

    objectId: {
      type: [Number, String],
      required: false,
      default: null
    },

    value: {
      requied: true,
      type: String,
      default: ''
    },
    placeholder: {
      requied: true,
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: '',
      // item: '',
      loading: false,
      errorsUpload: [],
      extensions: {
        image: ['png', 'PNG', 'jpeg', 'jpg', 'JPEG', 'JPG'],
        word: ['doc', 'DOC', 'docx', 'DOCX', 'odt', 'ODT'],
        pdf: ['pdf', 'Pdf']
      }
    }
  },
  computed: {
    extension() {
      // if (this.object && this.object[this.field]) {
      return this.value.split('.').pop()
      // }
      // return ''
    }
  },
  watch: {
    data(val) {
      let obj = val
      if (Array.isArray(val)) {
        obj = {}
        obj[this.field] = val[0]
        this.data = val[0]
        this.$emit('input', this.data)
      } else {
        this.$emit('input', val)
      }
    },

    value(val) {
      // alert('changed')
      this.data = this.value
    }
  },
  created() {
    // this.item = this.object
    this.data = this.value
  },

  methods: {
    onFileChange(e) {
      this.errorsUpload = []
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
      this.saveImage(files[0])
    },
    createImage(file) {
      // const image = new Image()
      const reader = new FileReader()
      // const vm = this
      reader.readAsDataURL(file)
    },
    saveImage(file) {
      this.loading = true
      const oData = new FormData()
      oData.append('image', file)
      oData.append('id', this.objectId)
      oData.append('field', this.field)

      // const vm = this
      this.$axios
        .post(this.endpoint, oData)
        .then(response => {
          this.data = response.data.data
        })
        .catch(error => {
          console.log('error', error.response.data.errors)
          if (error.response.data && error.response.data.errors) {
            if (error.response.data.errors.image) {
              this.errorsUpload = error.response.data.errors.image
            }
          }
          // this.loading=false
        })
        .finally(() => {
          this.loading = false
        })
    },
    removeImage: function(e) {
      this.data = ''
    }
  }
}
</script>

<style scoped></style>
