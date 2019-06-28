import forEach from 'lodash/forEach'
import keyBy from 'lodash/keyBy'
import cloneDeep from 'lodash/cloneDeep'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
import IndexedDb from '../components/offline/IndexedDb'

const endpoint = 'api/chantier'

// Création de la base de donnée locale et des tables.
const db = new IndexedDb([
  { name: endpoint, autoIncrement: false },
  { name: endpoint + '-deleted', autoIncrement: false },
  { name: endpoint + '-updated', autoIncrement: false },
  { name: endpoint + '-created', autoIncrement: true }
])

export const state = () => ({
  list: [],
  isOffline: false
})

export const actions = {
  async _sync_delete({ rootState }) {
    const dbInfos = {
      store: rootState.auth.user.id,
      tables: [endpoint + '-deleted']
    }

    await db
      .tx(dbInfos, 'readonly', transaction => {
        return db.getAll(transaction.objectStore(endpoint + '-deleted'))
      })
      .then(list => {
        console.log(`DELETE - ${list.length} elements`)
        forEach(list, o =>
          this.$axios.delete(`${endpoint}/${o.id}`).then(() => {
            console.log('-- deleted id ' + o.id)
            db.tx(dbInfos, 'readwrite', transaction => {
              transaction.objectStore(endpoint + '-deleted').delete(o.id)
            })
          })
        )
      })
  },

  async _sync_update({ rootState }) {
    const dbInfos = {
      store: rootState.auth.user.id,
      tables: [endpoint, endpoint + '-updated']
    }

    await db
      .tx(dbInfos, 'readonly', transaction => {
        return db.getAll(transaction.objectStore(endpoint + '-updated'))
      })
      .then(list => {
        console.log(`UPDATE - ${list.length} elements`)
        return Promise.all(
          map(list, o => {
            const req = image =>
              this.$axios
                .put(`${endpoint}/${o.id}`, {
                  name: o.name,
                  technicien_id: o.technicien_id,
                  client_id: o.client_id,
                  photo: image
                })
                .then(res => {
                  return db.tx(dbInfos, 'readwrite', transaction => {
                    transaction.objectStore(endpoint + '-updated').delete(o.id)
                    transaction.objectStore(endpoint).put(res.data.data)
                  })
                })

            if (o.imageFile) {
              const form = new FormData()
              form.append('field', 'photo')
              form.append('id', 'null')
              form.append('image', o.imageFile)

              /*
              On doit faire 2 requetes, une pour l'image, une pour le chantier.
              On pourrait rassembler les deux en modifiant le back (ca serait mieux).
               */
              return this.$axios
                .post(`${endpoint}/upload`, form)
                .then(resImg => req(resImg.data.data))
            }

            return req()
          })
        )
      })
  },

  async _sync_create({ rootState }) {
    const dbInfos = {
      store: rootState.auth.user.id,
      tables: [endpoint, endpoint + '-created']
    }

    await db
      .tx(dbInfos, 'readonly', transaction => {
        return db.getAll(transaction.objectStore(endpoint + '-created'))
      })
      .then(list => {
        console.log(`CREATE - ${list.length} elements`)
        return Promise.all(
          map(list, o => {
            const req = image =>
              this.$axios
                .post(`${endpoint}`, {
                  name: o.name,
                  technicien_id: o.technicien_id,
                  client_id: o.client_id,
                  photo: image
                })
                .then(res => {
                  return db.tx(dbInfos, 'readwrite', transaction => {
                    transaction.objectStore(endpoint + '-created').delete(o.id)
                    transaction.objectStore(endpoint).put(res.data.data)
                  })
                })

            if (o.imageFile) {
              const form = new FormData()
              form.append('field', 'photo')
              form.append('id', 'null')
              form.append('image', o.imageFile)

              /*
              On doit faire 2 requetes, une pour l'image, une pour le chantier.
              On pourrait rassembler les deux en modifiant le back (ca serait mieux).
               */
              return this.$axios
                .post(`${endpoint}/upload`, form)
                .then(resImg => req(resImg.data.data))
            }

            return req()
          })
        )
      })
  },

  sync({ state, commit, dispatch }) {
    console.log('sync data')
    return this.$axios
      .get('/api/auth')
      .then(() => {
        return Promise.all([
          dispatch('_sync_create'),
          dispatch('_sync_delete'),
          dispatch('_sync_update')
        ])
      })
      .then(() => dispatch('fetchRemoteData'))
      .catch(err => {
        this.offline = true
        dispatch('fetchLocalData')
        console.log(err)
      })
  },

  fetchRemoteData({ rootState, state, commit, dispatch }) {
    const dbInfos = {
      store: rootState.auth.user.id,
      tables: [endpoint, endpoint + '-updated', endpoint + '-created']
    }

    return this.$axios
      .get(endpoint)
      .then(res => {
        this.isOffline = false
        commit('init', { list: res.data.data })
        return db.tx(dbInfos, 'readwrite', transaction => {
          const list = transaction.objectStore(endpoint)
          forEach(res.data.data, o => list.put(o))
        })
      })
      .catch(err => {
        console.log(err)
        this.isOffline = true
        return dispatch('fetchLocalData')
      })
  },
  fetchLocalData({ rootState, state, commit }) {
    const dbInfos = {
      store: rootState.auth.user.id,
      tables: [endpoint, endpoint + '-created', endpoint + '-updated']
    }

    return Promise.all([
      db.tx(dbInfos, 'readonly', transaction => {
        return db.getAll(transaction.objectStore(endpoint))
      }),
      db.tx(dbInfos, 'readonly', transaction => {
        return db.getAll(transaction.objectStore(endpoint + '-updated'))
      }),
      db.tx(dbInfos, 'readonly', transaction => {
        return db.getAll(transaction.objectStore(endpoint + '-created'))
      })
    ]).then(values => {
      const list = keyBy(values[0], 'id')
      forEach(values[1], o => {
        list[o.id] = { ...list[o.id], ...o }
      })
      commit('init', { list: Object.values(list).concat(values[2]) })
    })
  },
  delete({ rootState, state, commit, dispatch }, obj) {
    const dbInfos = {
      store: rootState.auth.user.id,
      tables: [endpoint, endpoint + '-deleted']
    }

    return db
      .tx(dbInfos, 'readwrite', transaction => {
        if (obj.idb_state === 'created') {
          return transaction.objectStore(endpoint + '-created').delete(obj.id)
        }
        transaction.objectStore(endpoint).delete(obj.id)
        transaction.objectStore(endpoint + '-deleted').put(obj)
      })
      .then(() => {
        commit('remove', obj)
        dispatch('_sync_delete')
      })
  },
  update({ rootState, state, commit, dispatch }, obj) {
    const dbInfos = {
      store: rootState.auth.user.id,
      tables: [endpoint, endpoint + '-updated', endpoint + '-created']
    }

    return db
      .tx(dbInfos, 'readwrite', transaction => {
        if (obj.idb_state === 'created') {
          return transaction.objectStore(endpoint + '-created').put(obj)
        }
        return transaction.objectStore(endpoint + '-updated').put(obj)
      })
      .then(() => {
        commit('update', obj)
        dispatch('_sync_update')
      })
  },
  create({ rootState, state, commit, dispatch }, data) {
    const dbInfos = {
      store: rootState.auth.user.id,
      tables: [endpoint, endpoint + '-created']
    }

    /**
     * Il y a deux parties dans la création d'un chantier, le chantier lui-même
     * et l'image associée.
     *
     * Le chantier :
     *
     * Il est nécessaire d'attribuer un Id au chantier pour pouvoir
     * le stocker dans l'indexedDb. On n'a pas la possibilité de demander
     * au backend l'Id puisqu'on est offline, la generation de l'id doit se faire
     * coté front. Actuellement les chantiers utilisent des Id en int autoincrement.
     *
     * On pourrait grandement simplifier l'implémentation
     * en utilisant des Ids uniques type UUID qui peuvent être generés coté
     * front sans aucun problémes. C'est fortement conseillé. Cela nous permetterai
     * d'éviter d'avoir à créer des tables supplémentaires dans l'indexedDb.
     *
     * Dans le cas d'Id en autoincrement, nous ne pouvons pas generer les Ids coté
     * front, on a de gros risques d'avoir une collision si des choses ont été ajoutées
     * dans le back entre deux synchronisations.
     *
     * Du coup, on est obligé de créer une table différente dans l'indexedDb, cette
     * table va contenir les models qui sont en cours de création, et qui auront un Id
     * provisoire. Cette table se nomme "api/chantier-created" dans notre cas.
     *
     * Pour l'image :
     *
     * Dans le cas de l'image, nous n'avons pas le lien de disponible non plus
     * puisqu'elle n'a pas encore été envoyée. Du coup, à la place j'enregistre
     * l'image directement dans l'indexed Db.
     *
     */
    const chantier = {
      name: data.name,
      imageSrc: data.imageSrc,
      imageFile: data.imageFile,
      technicien_id: 6,
      client_id: 1,
      idb_state: 'created'
    }

    return db
      .tx(dbInfos, 'readwrite', transaction => {
        /** Un id sera automatiquement generer pour ce chantier
         * puisque la table est n autoincrement (au debut de ce fichier)
         */
        return transaction.objectStore(endpoint + '-created').add(chantier)
      })
      .then(id => {
        commit('add', {
          ...chantier,
          id: id
        })
        dispatch('_sync_create')
      })
  }
}

export const mutations = {
  init(state, { list }) {
    state.list = list
  },
  add(state, obj) {
    state.list.push(obj)
  },
  update(state, obj) {
    const listId = findIndex(state.list, { id: obj.id })
    state.list[listId] = obj
    state.list = cloneDeep(state.list) // Hack pour forcer le refresh
  },
  remove(state, obj) {
    state.list.splice(state.list.indexOf(obj), 1)
  }
}
