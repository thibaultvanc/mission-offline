<script>
import Toggleable from './toggleable'

export default {
  name: 'ModalChantierDelete',
  mixins: [Toggleable],
  data() {
    return {
      chantier: {}
    }
  },
  methods: {
    onActive({ chantier }) {
      this.chantier = chantier
    },
    deleteChantier() {
      this.$store.dispatch('chantiers/delete', this.chantier).then(() => {
        this.dismiss()
      })
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
      <v-card class="white pa-0" style="overflow: hidden">
        <v-toolbar class="transparent elevation-0 mt-2">
          <v-avatar size="40px" color="rgba(216, 0, 39, 0.18)">
            <v-icon color="red darken-1">delete</v-icon>
          </v-avatar>

          <h1 class="title ml-3 font-weight-bold secondary--text">
            Supprimer ce chantier ?
          </h1>

          <v-spacer></v-spacer>

          <v-btn icon @click="dismiss">
            <v-icon class="info--text">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container grid-list-lg class="pa-3">
          <p class="subheading grey--text text--darken-1">
            Le chantier sera supprimé définitivement. Êtes-vous sûr de vouloir
            continuer ?
          </p>
          <div class="text-xs-right">
            <v-btn
              color="white"
              outline
              class="my-4 grey--text text--darken-1 font-weight-bold"
              @click="dismiss"
              >Annuler</v-btn
            >
            <v-btn
              color="red darken-1"
              dark
              class="my-4 font-weight-bold"
              @click="deleteChantier"
              >Supprimer</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="stylus"></style>
