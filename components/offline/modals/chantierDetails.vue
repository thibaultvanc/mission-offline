<script>
import Toggleable from './toggleable'

export default {
  name: 'ModalChantierDetails',
  mixins: [Toggleable],
  data() {
    return {
      chantier: {},
      error: false,
      extra: {}
    }
  },
  methods: {
    onActive({ chantier }) {
      this.chantier = chantier
      if (chantier.idb_state !== 'created') {
        this.$axios
          .get(`/api/chantier/${this.chantier.id}`)
          .then(res => {
            this.extra = res.data
          })
          .catch(err => {
            console.log(err)
            this.error = true
          })
      }
    }
  }
}
</script>

<template>
  <div>
    <v-dialog
      v-model="isActive"
      lazy
      width="500px"
      persistent
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card v-if="isActive" class="pa-0" style="overflow: hidden">
        <v-toolbar class="transparent elevation-0 mt-2">
          <h1 class="title font-weight-bold secondary--text">
            Détails du chantier
          </h1>

          <v-spacer></v-spacer>

          <v-btn icon @click="dismiss">
            <v-icon class="info--text">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container grid-list-lg class="pa-3">
          <h2 class="title">Nom</h2>
          <p>{{ chantier.name }}</p>
          <h2 class="title">Image</h2>
          <p>
            <img
              :src="chantier.imageSrc ? chantier.imageSrc : chantier.photo"
              height="100px"
              alt=""
            />
          </p>
          <h2 class="title">Details</h2>
          <p>
            Les détails ne sont disponibles que en mode "En Ligne", ou hors
            ligne si ils ont au moins été vus une fois. (dans le fichier
            nuxt.config.js on indique qu'il doit mettre en cache les 50
            dernieres requetes sur ce endpoint)
          </p>
          <p v-if="error" class="error--text">
            Impossible de récuperer les infos
          </p>
          <pre>{{ extra }}</pre>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="stylus"></style>
