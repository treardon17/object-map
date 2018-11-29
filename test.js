const ObjectTree = require('./object-tree')

const objectTree = new ObjectTree()
objectTree.branch('services')
// objectTree.branch('tasks')
// objectTree.branch('devices')

// const val = objectTree.val('services.lifx.testing', 'hello', { create: true })
objectTree.val(['services', 'lifx', 'testing'], 'hello', { create: true })
objectTree.val(['services', 'lifx', 'testing'], 'hello2', { create: true })
const val = objectTree.val(['services', 'lifx', 'testing'])
// const val = objectTree.val('services', 'hello')
console.log(val)