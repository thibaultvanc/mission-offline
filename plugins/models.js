import Chantier from '~/models/Chantier'

import { Model } from 'vue-api-query'

const models = {}

export default function(ctx, inject) {
  Model.$http = ctx.$axios
  Model.laravel_endpoint = ctx.env.LARAVEL_ENDPOINT

  models.Chantier = Chantier
  inject('models', models)
}
