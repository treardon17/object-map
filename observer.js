class Observer {
  constructor({ onGet, onSet, autoCommit = true } = {}) {
    return new Proxy(this, {
      // SETTER
      set: (object, key, value, proxy) => {
        if (onSet instanceof Function) {
          // Middleware
          const commit = (cbKey, cbVal) => {
            // key is value if cbVal is undefined
            if (cbKey != null && cbVal == null) object[key] = cbKey
            // the commit key and value are defined
            else if (cbKey != null && cbVal != null) object[cbKey] = cbVal
            // otherwise the key and value default to the original
            else object[key] = value
          }
          const params = { object, key, value, proxy }
          if (!autoCommit) params.commit = commit
          onSet(params)
          if (autoCommit) commit()
        } else {
          object[key] = value
          return true
        }
      },
      // GETTER
      get: (object, key, value, proxy) => {
        if (onGet instanceof Function) {
          onGet({ object, key, value, proxy, commit: (cbKey, cbVal) => {
              // key is value if cbVal is undefined
              if (key == null && cbKey == null) return object
              if (cbKey == null) return object[key]
              else return object[cgKey]
            }
          })
        } else if (key != null) {
          return object[key]
        }
        return object
      }
    })
  }
}

module.exports = Observer