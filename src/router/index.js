import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/CartView.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/SingleProductView.vue'),
      },
      {
        path: 'faq',
        name: 'Faq',
        component: () => import('../views/FaqView.vue'),
      },
      {
        path: 'checkout/:orderId',
        name: 'Checkout',
        component: () => import('../views/CheckoutView.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'orders',
        name: 'Order',
        component: () => import('../views/dashboard/OrderView.vue'),
      },
      {
        path: 'products',
        name: 'DashboardProduct',
        component: () => import('../views/dashboard/ProductsView.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupon',
        component: () => import('../views/dashboard/CouponsView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Home',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
