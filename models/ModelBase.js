import { Model as BaseModel } from 'vue-api-query'
// require('dotenv').config()

export default class Model extends BaseModel {
  /**
   *  Setup
   */
  get laravel() {
    console.log('Model.laravel_endpoint', Model.laravel_endpoint)
    return Model.laravel_endpoint
  }

  // define a base url for a REST API
  baseURL() {
    return process.env.LARAVEL_ENDPOINT
  }

  search(value) {
    return this.where('search', value)
  }

  find(identifier) {
    // reecriture du parent pour car cree un la class sur response. data au lieu de response.data.data
    if (identifier === undefined) {
      throw new Error('You must specify the param on find() method.')
    }
    const base = this._fromResource || `${this.baseURL()}/${this.resource()}`
    const url = `${base}/${identifier}${this._builder.query()}`

    return this.request({
      url,
      method: 'GET'
    }).then(response => new this.constructor(response.data.data))
  }

  // implement a default request method
  request(config) {
    console.log('config', config)
    return this.$http.request(config)
  }

  static fake() {
    const self = this.instance()
    const r = self.custom(self.resource() + '/fake').first()

    return r
  }

  action(actionName) {
    const config = {
      url: this.endpoint() + '/' + actionName,
      method: 'POST'
    }
    // console.log('config', config)
    return this.$http.request(config)
  }

  /*  static fetchList(loads, filters) {
    return this.include(loads)
  } */
  static fetchList(loads, filters) {
    let base

    if (loads && loads.length) {
      base = this.include(loads)
    } else {
      base = this
    }

    if (filters) {
      // base.where('product_state_id', filters.product_state)

      Object.entries(filters).forEach(e => {
        console.log('e', e)
        if (e[0] && e[1]) {
          if (Array.isArray(e[1])) {
            base.whereIn(e[0], e[1])
          } else {
            base.where(e[0], e[1])
          }
        }
        // base.where((e[0], e[1]))
      })
      /* console.log('epppp')
       */
    }
    return base
  }
  _create() {
    return this.request({
      method: 'POST',
      url: this.endpoint(),
      data: this
    }).then(response => {
      const self = Object.assign(this, response.data.data) // add .data from original
      return self
    })
  }

  _update() {
    return this.request({
      method: 'PUT',
      url: this.endpoint(),
      data: this
    }).then(response => {
      const self = Object.assign(this, response.data.data) // add .data from original
      return self
    })
  }

  hydrateObject(newObject) {
    const self = Object.assign(this, newObject) // add .data from original
    return self
  }

  /**
   * given an object ex ProductModel
   * this fct('model.name') returns : Iphone 8Go ..
   */
  getNodeValue(fieldWithDots) {
    // console.log('fieldWithDots', fieldWithDots)

    const pieces = fieldWithDots.split('.')
    let toReturn = this
    pieces.forEach(part => {
      toReturn = toReturn[part]
    })
    return toReturn
    // console.log('node', node)
    // console.log('this', this)
  }

  get singleUploadEndpoint() {
    return this.resource() + '/upload'
  }

  get wysiwygFileEndpoint() {
    return this.resource() + '/wysiwyg-upload'
  }
}
