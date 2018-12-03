class Observer {
  constructor({ onGet, onSet, data, autoCommitSet = true, autoCommitGet = true } = {}) {
    const handler = {
      // SETTER
      set: (object, key, value, proxy) => {
        // If we have an "onSet" handler
        if (onSet instanceof Function) {
          // The "commit" function is to allow overrides for setting values.
          // You can block a value from being set if you don't commit it.
          // Only available if "autoCommitSet" is false.
          const commit = (cbKey, cbVal) => {
            // Key is value if cbVal is undefined
            if (cbKey != null && cbVal == null) Reflect.set(object, key, cbKey)
            // The commit key and value are defined
            else if (cbKey != null && cbVal != null) Reflect.set(object, cbKey, cbVal)
            // Otherwise the key and value default to the original
            else Reflect.set(object, key, value)
          }
          const params = { object, key, value, proxy }
          !autoCommitSet && (params.commit = commit)
          // Call the "onSet" callback with the given parameters
          onSet(params)
          // If "autoCommitSet" is enabled, immediately commit the value changes
          if (autoCommitSet) commit()
        } else {
          // Otherwise, set the value like normal
          return Reflect.set(object, key, value)
        }
        // Must return true otherwise an error will be thrown
        return true
      },
      // GETTER
      get: (object, key) => {
        // Getter function to allow proxy chaining
        // which lets us use nested objects
        const getItem = (obj, k) => {
          const value = Reflect.get(obj, k)
          if (typeof value === 'object') return new Proxy(value, handler)
          return value
        }
        // If we have an "onGet" handler
        if (onGet instanceof Function) {
          // The "commit" function is to allow for value overrides
          // so you can block values from being accessible if needed.
          // Only available if "autoCommitGet" is set to false
          const commit = (val) => {
            if (val != null) return val
            else return getItem(object, key)
          }
          const params = { object, key, value: getItem(object, key) }
          !autoCommitGet && (params.commit = commit)
          // Call the "onGet" callback with the given parameters
          onGet(params)
          if (autoCommitGet) commit()
        }
        return getItem(object, key)
      }
    }
    // GENERATE PROXY
    return new Proxy(typeof data === 'object' ? data : this, handler)
  }
}

module.exports = Observer