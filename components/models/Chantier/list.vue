<template>
  <list-classic
    :model="model"
    :method="method"
    :form-cmpnt="formCmpnt"
    :card-cmpnt="cardCmpnt"
  >
    <template slot="line" slot-scope="{ item: chantier }">
      <!-- <pre class="mt-5"><b>formCmpnt :</b> {{formCmpnt}}</pre> -->
      <!-- <v-list-tile-avatar>
        <img :src="chantier.avatar" />
      </v-list-tile-avatar> -->

      <v-list-tile-content>
        <v-list-tile-title
          >#{{ chantier.id }} -- {{ chantier.name }}</v-list-tile-title
        >
        <v-list-tile-sub-title>{{ chantier }} </v-list-tile-sub-title>
      </v-list-tile-content>
    </template>

    <template slot="actions" slot-scope="{ item: chantier, removeElem }">
      <v-list-tile-action>
        <v-btn color="default" icon @click.stop="removeElem(chantier)">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-list-tile-action>
    </template>

    <!-- <template slot="form">
      <chantier-form></chantier-form>
    </template> -->
  </list-classic>
</template>

<script>
import ListClassic from '~/components/Library/List/type/Classic'
import Card from './card'
import Form from './form'
export default {
  components: {
    ListClassic
    // UserForm
  },
  props: {
    model: { required: false, type: String, default: 'Chantier' },
    method: { required: false, type: String, default: 'fetchList' },
    formCmpnt: { required: false, type: Object, default: () => Form },
    cardCmpnt: { required: false, type: Object, default: () => Card }
  },
  computed: {
    /* formToUse() {
      return this.form ? this.form : UserForm
    } */
  }
}
</script>
