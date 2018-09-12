import { asyncRouterMap, constantRouterMap } from '@/router'
import { getRouters } from '@/api/login'
import Layout from '@/views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

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
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
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
