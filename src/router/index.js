import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import PurchaseView from '../views/PurchaseView.vue';
import SellView from '../views/SellView.vue';
import HistorialView from '../views/HistorialView.vue';
import AnalisisActualView from '../views/AnalisisActualView.vue';
import AnalisisInversionView from '../views/AnalisisInversionView.vue';
import store from '../store/index';

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
    meta: { vistaProtegida: true },
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: PurchaseView,
    meta: { vistaProtegida: true },
  },
  {
    path: '/sell',
    name: 'sell',
    component: SellView,
    meta: { vistaProtegida: true },
  },
  {
    path: '/historial',
    name: 'historial',
    component: HistorialView,
    meta: { vistaProtegida: true },
  },
  {
    path: '/analisis/actual',
    name: 'analisisActual',
    component: AnalisisActualView,
    meta: { vistaProtegida: true },
  },
  {
    path: '/analisis/inversion',
    name: 'analisisInversion',
    component: AnalisisInversionView,
    meta: { vistaProtegida: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const esVistaProtegida = to.matched.some((item) => item.meta.vistaProtegida);
  if (esVistaProtegida && store.state.Id === null) {
    next('/');
  } else {
    next();
  }
});

export default router;
