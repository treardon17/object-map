const ObjectMap = require('./object-map')

class ObjectTree {
  constructor() {
    this.root = new ObjectMap()
    this.parent = null
  }

  branch(id) {
    const branch = new ObjectTree()
    branch.parent = this
    this.root.map[id] = branch
    this.root.addListener({ id, callback: this.onBranchUpdate.bind(this) })
    return branch
  }

  nestedVal(id = [], value, create = false) {
    let val = this.root.map[id[0]]
    for (let i = 1; i < id.length; i += 1) {
      const lastIndex = (i === id.length - 1)
      let newID = null
      if (id[i] != null) newID = id[i]
      else return new Error('Null value in ID sequence')
      if (val.root.map[newID] === undefined) {
        if (create) {
          if (lastIndex) {
            // we're at the end of the list
            val.root.map[newID] = value
          } else {
            // we're not at the end
            val = val.branch(newID)
          }
        } else {
          return null
        }
      } else {
        if (value !== undefined && lastIndex) {
          val.root.map[newID] = value
          val = value
        }
        else val = val.root.map[newID]
      }
    }
    return val
  }

  val(id, value, { create = false } = {}) {
    let item = null
    // retrieving value
    if (typeof id === 'string') {
      const split = id.split('.')
      // no periods in string
      if (split.length === 1) {
        this.root.map[id] = value
        item = this.root.map[id]
      } else {
        item = this.nestedVal(split, value, create)
      }
    } else if (Array.isArray(id)) {
      item = this.nestedVal(id, value, create)
    }
    return item
  }

  onBranchUpdate(method, prop, value) {
    if (this.parent instanceof ObjectTree) {
      this.parent.onBranchUpdate(method, prop, value)
      // the parent is dirty if we set something in the child
      if (method === 'set') {
        this.parent.root.markDirty()
      }
    }
  }
}

module.exports = ObjectTree
