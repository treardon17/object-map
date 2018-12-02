class Observer {
  constructor({ onGet, onSet, data = {}, autoCommit = true } = {}) {
    // GENERATE PROXY
    const proxy = new Proxy(this, {
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
        }
        return true
      },
      // GETTER
      get: (object, key) => {
        if (onGet instanceof Function) {
          const commit = (cbKey) => {
            // key is value if cbVal is undefined
            if (key == null && cbKey == null) return object
            if (cbKey == null) return object[key]
            else return object[cgKey]
          }
          const params = { object, key }
          if (!autoCommit) params.commit = commit
          onGet(params)
          if (autoCommit) commit()
        } else if (key != null) {
          return object[key]
        }
        return object
      }
    })

    // setup data
    if (data instanceof Object) {
      Object.keys(data).forEach((key) => {
        proxy[key] = new Observer({ data: data[key] })
      })
    } else {
      console.log(data)
    }

    return proxy
  }
}

module.exports = Observer