import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/app/layout'
    },
    {
      path: '/myTable',
      name: 'myTable',
      component: () => import('../components/CanvasTable/mytable.vue'),
      // component: () => import('../components/CanvasTable/bugDemo.vue'),
    },
    {
      path: '/dndDemo',
      name: 'dndDemo',
      component: () => import('../components/DndDemo/dndDemo.vue'),
    },
    {
      path: '/app',
      name: 'app',
      children: [

        {
          path: 'dataSource',
          name: 'dataSource',
          component: () => import('../views/DataSourceView.vue'),
        },
        {
          path: 'layout',
          name: 'layout',
          component: () => import('../views/LayoutView.vue')
        },
        {
          path: 'actions',
          name: 'actions',
          component: () => import('../views/ActionsView.vue')
        },
      ]
    },

  ]
})

export default router
