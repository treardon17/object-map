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

const obs = new Observer({
  data: {
    hello: [{ value: 'test' }]
  },
  onSet: ({ key, value }) => {
    console.log('SET', key, value)
  },
  onGet: ({ object, key }) => {
    console.log('GET', object, key)
  }
})

obs.hello[0].value = 'did this work'
console.log('val is:', obs.hello[0].value)

