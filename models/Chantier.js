import Model from './ModelBase.js'
export default class Chantier extends Model {
  primaryKey() {
    return 'id'
  }
  static form() {
    return new Chantier({
      name: null,
      photo: null
    })
  }
  resource() {
    return 'api/chantier'
  }
}
