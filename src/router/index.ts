import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import EditableTableView from '@/views/EditableTableView.vue'
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
    path: '/editable-table',
    name: 'editable-table',
    component: EditableTableView,
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
