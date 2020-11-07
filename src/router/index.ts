import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/hotel/:id',
    name: 'HotelDetails',
    component: () => import(/* webpackChunkName: "details" */ '../views/Details.vue'),
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import(/* webpackChunkName: "booking" */ '../views/Booking.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: async () => ({ x: 0, y: 0, el: 'body' }),
});

export default router;
