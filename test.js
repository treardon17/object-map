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
// const obs = new Observer({ autoCommit: false, onSet: ({ object, key, value, commit }) => {
//   console.log(object, key, value)
//   commit('test prop', 'middleware')
// }})
const obs = new Observer({
  data: {
    hello: 'world'
  },
  onSet: ({ object, key, value }) => {
    console.log('SET', object, key, value)
  },
  onGet: ({ object, key }) => {
    console.log('GET', object[key])
  }
})

// const test = obs['test prop']
// obs.test = {}
// obs.test.something = 'hello!'
// obs.test.something = 'hello2!'
// console.log(obs.test.something)