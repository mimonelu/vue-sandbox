import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import VeditableView from '@/views/VeditableView.vue'
import EditableTreeView from '@/views/EditableTreeView.vue'
import TopView from '@/views/TopView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'top',
    component: TopView,
  },
  {
    path: '/veditable',
    name: 'veditable',
    component: VeditableView,
  },
  {
    path: '/editable-tree',
    name: 'editable-tree',
    component: EditableTreeView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
