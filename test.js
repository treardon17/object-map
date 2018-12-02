// const ObjectTree = require('./object-tree')

// const objectTree = new ObjectTree()
// objectTree.branch('services')
// // objectTree.branch('tasks')
// // objectTree.branch('devices')

// // const val = objectTree.val('services.lifx.testing', 'hello', { create: true })
// // objectTree.val(['services', 'lifx', 'testing'], 'hello', { create: true })
// objectTree.val(['services', 'lifx', 'testing'], 'hello', { create: true })
// // const val = objectTree.val(['services', 'lifx', 'testing'])
// // const val = objectTree.val('services', 'hello')
// console.log(objectTree)

const Observer = require('./observer')
const obs = new Observer({ autoCommit: false, onSet: ({ object, key, value, commit }) => {
  console.log(object, key, value)
  commit('test prop', 'middleware')
}})
// const test = obs['test prop']
obs['test prop'] = 'success!'
console.log(obs['test prop'])