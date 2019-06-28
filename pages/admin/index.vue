<template>
  <div>
    <h1>Liste des chantiers</h1>

    <v-toolbar class="transparent elevation-0">
      <v-text-field
        v-model="search"
        hide-details
        box
        append-icon="search"
      ></v-text-field>

      <v-btn outline color="primary" @click="syncData">
        <v-icon class="mr-3">refresh</v-icon>
        Synchro
      </v-btn>

      <v-btn color="success" @click="openModal('ModalChantierCreate')">
        <v-icon class="mr-3">add</v-icon>
        Ajouter
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-tile
        v-for="chantier in chantiers"
        :key="`${chantier.id}-${chantier.idb_state}`"
        avatar
        @click="openModal('ModalChantierDetails', chantier)"
      >
        <v-list-tile-avatar>
          <img :src="chantier.imageSrc ? chantier.imageSrc : chantier.photo" />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title
            ><b>#{{ chantier.id }}</b> -- {{ chantier.name }}</v-list-tile-title
          >
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn
            color="default"
            icon
            @click.stop="openModal('ModalChantierEdit', chantier)"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </v-list-tile-action>

        <v-list-tile-action>
          <v-btn
            color="default"
            icon
            @click.stop="openModal('ModalChantierDelete', chantier)"
          >
            <v-icon>clear</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <!-- Modals -->
    <ModalChantierCreate></ModalChantierCreate>
    <ModalChantierEdit></ModalChantierEdit>
    <ModalChantierDetails></ModalChantierDetails>
    <ModalChantierDelete></ModalChantierDelete>
  </div>
</template>

<script>
import Fuse from 'fuse.js'

import ModalChantierCreate from '~/components/offline/modals/chantierCreate'
import ModalChantierDetails from '~/components/offline/modals/chantierDetails'
import ModalChantierDelete from '~/components/offline/modals/chantierDelete'
import ModalChantierEdit from '~/components/offline/modals/chantierEdit'

export default {
  components: {
    ModalChantierEdit,
    ModalChantierDetails,
    ModalChantierDelete,
    ModalChantierCreate
  },
  layout: 'admin',
  data() {
    return {
      search: ''
    }
  },
  computed: {
    /**
     * Dans le cas du mode offline, il faut vraiment penser différemment la
     * façon de faire les requetes. On est obligé de faire du offline first.
     * Tout ce qui est recherche, tri doit être fait le plus possible coté front.
     * Dans le cas d'une liste simple, aucun problémes.
     * Ci dessous j'utilise une lib trés simple pour faire une recherche sur le nom,
     * c'est suffisant dans la majorité des cas. Le tri peut également étre fait facilement
     * coté front, à base de filter, OrderBy (lodash), etc ....
     *
     * Dans le cas ou on est obligé de faire les requetes coté back si les options sont
     * trop complexes, dans ce cas il faut simplement masquer le bouton ou afficher
     * une erreur si on est offline.
     *
     */
    chantiers() {
      let list = this.$store.state.chantiers.list
      // On fait la recherche coté front pour le mode offline.
      // Ici j'utilise une lib qui s'apelle Fuse.js.
      if (this.search) {
        const fuse = new Fuse(list, {
          keys: ['name']
        })
        list = fuse.search(this.search)
      }
      return list
    }
  },
  mounted() {
    this.syncData()
  },
  methods: {
    syncData() {
      this.$store.dispatch('chantiers/sync')
    },
    openModal(name, chantier) {
      this.$bus.$emit('toggleable.open', {
        name,
        chantier
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
