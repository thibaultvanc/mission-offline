import forEach from 'lodash/forEach'

export default class IndexedDB {
  constructor(tables) {
    this.dbPromise = null
    this.tables = tables
  }

  getDb(store) {
    if (!this.dbPromise) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(store, 1)
        request.onupgradeneeded = _ => {
          const db = request.result
          forEach(this.tables, o => {
            db.createObjectStore(o.name, {
              keyPath: 'id',
              autoIncrement: o.autoIncrement
            })
          })
        }
        request.onerror = _ => reject(request.error)
        request.onsuccess = _ => resolve(request.result)
      })
    }
    return this.dbPromise
  }

  tx({ store, tables }, mode, callback) {
    return this.getDb(store).then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(tables, mode)
        const request = callback(transaction)

        if (request instanceof IDBRequest) {
          request.onsuccess = _ => resolve(request.result)
        } else if (request) {
          resolve(request)
        }

        transaction.onerror = _ => reject(transaction.error)
        transaction.oncomplete = _ => resolve(transaction.result)
      })
    })
  }

  iterate(cursorRequest, callback) {
    return new Promise((resolve, reject) => {
      cursorRequest.onerror = err => reject(err)
      cursorRequest.onsuccess = _ => {
        if (!cursorRequest.result) {
          resolve()
          return
        }
        callback(cursorRequest.result, resolve)
      }
    })
  }

  getAll(cursorable) {
    if ('getAll' in cursorable) {
      return cursorable.getAll()
    }

    const items = []

    return this.iterate(cursorable.openCursor(), cursor => {
      items.push(cursor.value)
      cursor.continue()
    }).then(_ => items)
  }
}
