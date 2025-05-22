import {createRouter, createWebHistory} from 'vue-router'

import RecordsView from '../views/RecordsView.vue'
// import Shops from '../views/Shops.vue'
// import Analytics from '../views/Analytics.vue'
// import Orders from '../views/Orders.vue'
// import AdminLogin from '../views/AdminLogin.vue'
import RecordDetails from '../views/RecordDetails.vue'

const routes = [
    {path: '/', component: RecordsView },
    // {path: '/shops', component: Shops },
    // {path: '/analytics', component: Analytics },
    // {path: '/orders', component: Orders },
    // {path: '/admin', component: AdminLogin },
    {path: '/recordings/:id', component: RecordDetails}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;