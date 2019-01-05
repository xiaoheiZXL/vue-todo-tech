import Vue from 'vue'

import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 0

const removeInstance = instance => {
  if (!instance) return
  const index = instances.findIndex(item => item.id === instance.id)
  instances.splice(index, 1)
}

const notify = options => {
  if (Vue.prototype.$isServer) return

  let {
    autoClose,
    ...rest
  } = options
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: !autoClose ? 3000 : autoClose
    }
  })

  let id = `notification${seed++}`

  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  let verticalOffset = 0

  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })

  verticalOffset += 16

  instance.verticalOffset = verticalOffset

  instances.push(instance)
  instance.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.$destroy()
  })
  instance.$on('close', () => {
    instance.vm.visible = false
    let index = instances.findIndex(item => item.id === instance.id)
    for (let i = index; i < instances.length; i++) {
      let item = instances[i]
      item.verticalOffset -= instance.$el.offsetHeight + 16
    }
  })
  return instance.vm
}

export default notify
