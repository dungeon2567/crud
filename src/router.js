import Vue from 'vue'
import Router from 'vue-router'
import Grower from './pages/Grower.vue'
import Properties from './pages/Properties.vue'
import QRCodeScanner from './pages/QRCodeScanner.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/grower',
      component: Grower
    },
    {
      path: '/properties',
      component: Properties
    },
    {
      path: '/qrcode-scanner',
      component: QRCodeScanner
    },
  ]
})
