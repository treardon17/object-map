const ObjectTree = require('./object-tree')

const objectTree = new ObjectTree()
objectTree.branch('services')
// objectTree.branch('tasks')
// objectTree.branch('devices')

// const val = objectTree.val('services.lifx.testing', 'hello', { create: true })
const val = objectTree.val(['services', 'lifx', 'testing'], 'hello', { create: true })
// const val = objectTree.val('services', 'hello')
console.log(val)