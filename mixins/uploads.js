import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  watch: {
    mediaToDelete(val) {
      // console.log('del media', val)
      // this.mediaToDelete.push(val)
      // this.clearDropZone()
      // this.form.delete_medias = val
    }
  },
  created() {
    // this.dropzoneOptions.url = this.tempStorePath
    // alert(process.env.LARAVEL_ENDPOINT + '/api/store_media_temp')
  },
  data() {
    return {
      mediaToDelete: [],
      files: [],
      dropzoneOptions: {
        url: process.env.LARAVEL_ENDPOINT + '/api/store_media_temp',
        thumbnailWidth: 150,
        timeout: process.env.LARAVEL_UPLOAD_TIMEOUT_MILLISECOND,
        maxFilesize: process.env.LARAVEL_UPLOAD_MAX_FILESIZE,
        addRemoveLinks: true,
        dictDefaultMessage:
          "<i class='fa fa-cloud-upload fa-2x'></i> Ajouter des fichiers"
      }
    }
  },
  props: {},
  computed: {},
  methods: {
    clearDropZone() {
      if (this.$refs.medias) {
        this.$refs.medias.removeAllFiles()
      }
    }
  }
}
