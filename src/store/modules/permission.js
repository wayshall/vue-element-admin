import { asyncRouterMap, constantRouterMap } from '@/router'
import { getRouters } from '@/api/login'
import Layout from '@/views/layout/Layout'

function filterAndEnhanceRouters(routers) {
  routers.forEach(router => {
    const viewPath = router.componentViewPath
    if (!viewPath) {
      // ignore
    } else if (viewPath === 'Layout') {
      router.component = Layout
    } else {
      router.component = () => import(viewPath)
    }

    if (router.children && router.children.length > 0) {
      filterAndEnhanceRouters(router.children)
    }
  })
  return routers
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers.concat(asyncRouterMap)
      state.routers = constantRouterMap.concat(routers).concat(asyncRouterMap)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // const { roles } = data
        // let accessedRouters
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        getRouters().then(res => {
          let asyncRouters = res.data.data
          console.log(asyncRouters)
          asyncRouters = filterAndEnhanceRouters(asyncRouters)
          console.log(asyncRouters)
          commit('SET_ROUTERS', asyncRouters)
          resolve(asyncRouters)
        }).catch(err => {
          resolve(err)
        })
      })
    }
  }
}

export default permission
