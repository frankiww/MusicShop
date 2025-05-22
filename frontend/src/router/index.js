import {createRouter, createWebHistory} from 'vue-router'

import Records from '../views/RecordsView.vue'
// import Shops from '../views/Shops.vue'
// import Analytics from '../views/Analytics.vue'
// import Orders from '../views/Orders.vue'
// import AdminLogin from '../views/AdminLogin.vue'

const routes = [
    {path: '/', component: Records },
    // {path: '/shops', component: Shops },
    // {path: '/analytics', component: Analytics },
    // {path: '/orders', component: Orders },
    // {path: '/admin', component: AdminLogin }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;