<template>
  <div v-if="!loading">
    <div class="">
      <div>{{ chantier.name }}</div>
    </div>
  </div>
</template>

<script>
// import userActionInvite from './actions/invite'
import cardModelMixin from '~/mixins/cardModelMixin'
// import Medias from '~/components/Library/Media/Medias.vue'

export default {
  components: {
    //  Medias, userActionInvite
  },
  mixins: [cardModelMixin],
  data() {
    return {
      model: 'Chantier', // required

      /**
       * optional
       * model_variable_name :
       * use to know wich property data to populate when fetching the record (here to the  "address" data just below)
       */
      // model_variable_name: 'grade', // optionnal (but if not given, it convert the "model" data TO snake_cade),

      /**
       * ce nom "address" est relié à "model_variable_name"
       */
      chantier: {}
    }
  }
}
</script>
