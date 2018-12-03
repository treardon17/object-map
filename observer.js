class Observer {
  constructor({ onGet, onSet, data, autoCommit = true } = {}) {
    const handler = {
      // SETTER
      set: (object, key, value, proxy) => {
        if (onSet instanceof Function) {
          // Middleware
          const commit = (cbKey, cbVal) => {
            // key is value if cbVal is undefined
            if (cbKey != null && cbVal == null) Reflect.set(object, key, cbKey)
            // the commit key and value are defined
            else if (cbKey != null && cbVal != null) Reflect.set(object, cbKey, cbVal)
            // otherwise the key and value default to the original
            else Reflect.set(object, key, value)
          }
          const params = { object, key, value, proxy }
          if (!autoCommit) params.commit = commit
          onSet(params)
          if (autoCommit) commit()
        } else {
          return Reflect.set(object, key, value)
        }
        return true
      },
      // GETTER
      get: (object, key) => {
        // getter function to allow proxy chaining
        // which lets us use nested objects
        const getItem = (obj, k) => {
          const value = Reflect.get(obj, k)
          if (typeof value === 'object') return new Proxy(value, handler)
          return value
        }
        // if we have an "onGet" handler
        if (onGet instanceof Function) {
          // The "commit" function is to allow for value overrides
          // so you can block values from being accessible if needed.
          // Only available if "autoCommit" is set to false
          const commit = (val) => {
            if (val != null) return val
            else return getItem(object, key)
          }
          const params = { object, key, value: getItem(object, key) }
          if (!autoCommit) params.commit = commit
          onGet(params)
          if (autoCommit) commit()
        }
        return getItem(object, key)
      }
    }
    // GENERATE PROXY
    const proxy = new Proxy(typeof data === 'object' ? data : this, handler)
    return proxy
  }
}

module.exports = Observer