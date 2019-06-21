<template>
  <div>
    <h1>Liste des chantiers</h1>

    <chantier-list></chantier-list>
  </div>
</template>

<script>
import ChantierList from '~/components/models/Chantier/list.vue'

export default {
  components: { ChantierList },
  layout: 'admin'
}
</script>

<style lang="scss" scoped></style>
