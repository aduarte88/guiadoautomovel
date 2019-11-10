

// single pages
import homePage from '../pages/Home.vue'
import carsDetail from '../pages/cars/CarsDetail.vue'
import notFoundPage from '../pages/NotFound.vue'

import { routePropResolver } from './util'
import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: homePage,
    meta: { title: `${DOMAIN_TITLE} | home` }
  },
  {
    path: '/cars/:id',
    name: 'cars',
    component: carsDetail,
    meta: { title: `${DOMAIN_TITLE} | cars` },
    props: routePropResolver
  },

  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  }
]
