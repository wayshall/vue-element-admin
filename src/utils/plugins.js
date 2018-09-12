import service from './request'
import lodash from 'lodash'

export const axiosPlugin = {
  install: function(Vue, name = '$http') {
    console.log('install axios plugin...')
    Object.defineProperty(Vue.prototype, name, { value: service })
  }
}

export const lodashPlugin = {
  install: function(Vue, name = '$_') {
    Object.defineProperty(Vue.prototype, name, {
      value: lodash
    })
  }
}

export const installAll = vue => {
  vue.use(axiosPlugin)
  vue.use(lodashPlugin)
}
