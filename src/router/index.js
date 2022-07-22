import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import PurchaseView from '../views/PurchaseView.vue';
import SellView from '../views/SellView.vue';
import HistorialView from '../views/HistorialView.vue';
import AnalisisActualView from '../views/AnalisisActualView.vue';
import AnalisisInversionView from '../views/AnalisisInversionView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: PurchaseView,
  },
  {
    path: '/sell',
    name: 'sell',
    component: SellView,
  },
  {
    path: '/historial',
    name: 'historial',
    component: HistorialView,
  },
  {
    path: '/analisis/actual',
    name: 'analisisActual',
    component: AnalisisActualView,
  },
  {
    path: '/analisis/inversion',
    name: 'analisisInversion',
    component: AnalisisInversionView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
