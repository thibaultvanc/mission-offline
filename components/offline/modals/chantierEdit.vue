<script>
import cloneDeep from 'lodash/cloneDeep'
import Toggleable from './toggleable'

export default {
  name: 'ModalChantierEdit',
  mixins: [Toggleable],
  data() {
    return {
      chantierTmp: '',
      imageFile: '',
      imageSrc: null,
      chantier: ''
    }
  },
  methods: {
    onActive({ chantier }) {
      console.log(chantier)
      this.chantierTmp = cloneDeep(chantier)
      this.imageSrc = chantier.imageSrc
    },
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
    update() {
      this.$store.dispatch('chantiers/update', {
        ...this.chantierTmp,
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
          <v-text-field
            v-model="chantierTmp.name"
            hide-details
            box
          ></v-text-field>

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
            <img
              v-if="imageSrc"
              :src="imageSrc ? imageSrc : chantier.photo"
              height="150px"
              alt=""
            />
          </p>

          <div class="pt-3 text-xs-right">
            <v-btn color="success" dark class="font-weight-bold" @click="update"
              >Valider</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="stylus"></style>
