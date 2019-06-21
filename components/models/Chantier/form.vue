<template>
  <div class="">
    <i-form
      ref="iform"
      :value="value"
      :model="model"
      @cancel="$emit('cancel')"
      @stored="elem => $emit('stored', elem)"
      @updated="elem => $emit('updated', elem)"
      @input="val => $emit('input', val)"
    >
      <template slot-scope="{ form, errors }">
        <i-field
          v-if="showField('name')"
          v-model="form.name"
          placeholder="Nom du chantier"
          :errors="errors.hasOwnProperty('name') ? errors.name : []"
          type="string"
        ></i-field>

        <i-field
          v-model="form.photo"
          placeholder="Photo"
          type="file"
          :errors="errors.hasOwnProperty('photo') ? errors.photo : []"
          :object-id="form.id"
          :endpoint="form.resource() + '/upload'"
          field="photo"
        ></i-field>
      </template>
    </i-form>
  </div>
</template>

<script>
import formModelMixin from '@/mixins/formModelMixin'

// import Uploads from '@/mixins/uploads'
// import Medias from '~/components/Library/Media/Medias.vue'
export default {
  components: {},
  mixins: [formModelMixin],
  data() {
    return {
      model: 'Chantier'
    }
  }
}
</script>
