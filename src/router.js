import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'
import About from './views/About.vue'
import DetailPairs from '../src/components/DetailPairs'
import Visual from '../src/components/Visual'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'detailPairs',
          component: DetailPairs
        },
        {
          path: 'home/visual/',
          name: 'visual/',
          component: Visual
        }
      ]
    },

    {
      path: '/Settings',
      name: 'Settings',
      component: Settings
    },

    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})