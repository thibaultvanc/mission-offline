<script>
import Toggleable from './toggleable'

export default {
  name: 'ModalChantierCreate',
  mixins: [Toggleable],
  data() {
    return {
      name: '',
      imageFile: '',
      imageSrc: null
    }
  },
  methods: {
    /**
     * Nous ne pouvons pas utiliser de librairies comme Vue2Dropzone
     * qui ne fonctionnent pas en mode offline.
     * Il est nécessaire de faire la generation de la thumbnail coté
     * front, c'est trés simple, rapide et ca à l'avantage d'éviter
     * de faire des requetes à l'api si la personne change d'image sans
     * valider par exemple. L'upload ne se fait qu'a la validation.
     * Dans notre cas, l'image sera stockée par la suite sous forme de
     * Blob dans l'indexedDb.
     */
    addImage(e) {
      if (e.target.files && e.target.files[0]) {
        this.imageFile = e.target.files[0]

        const reader = new FileReader()

        reader.onload = e => {
          this.imageSrc = e.target.result
        }

        reader.readAsDataURL(e.target.files[0])
      }
    },
    create() {
      this.$store.dispatch('chantiers/create', {
        name: this.name,
        imageSrc: this.imageSrc,
        imageFile: this.imageFile
      })
      this.dismiss()
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
          <v-text-field v-model="name" hide-details box></v-text-field>

          <h2 class="title mt-3">Image</h2>

          <label
            for="inputExtra"
            class="elevation-0 v-btn v-btn--outline theme--light"
          >
            Ajouter
            <v-icon class="ml-2">mdi-plus</v-icon>
          </label>
          <input
            id="inputExtra"
            type="file"
            accept="image/gif, image/jpeg, image/png"
            style="display: none;"
            @change="addImage"
          />

          <p>
            <img v-if="imageSrc" :src="imageSrc" height="150px" alt="" />
          </p>

          <div class="pt-3 text-xs-right">
            <v-btn color="success" dark class="font-weight-bold" @click="create"
              >Valider</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="stylus"></style>
