import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/ordem-de-servico',
      component: () => import('./views/OrdemServico.vue')
    },
    {
      path: '/data-types',
      component: () => import('./views/DataTypes.vue')
    },
    {
      path: '/input-table',
      component: () => import('./views/InputTable.vue')
    }
  ]
})
