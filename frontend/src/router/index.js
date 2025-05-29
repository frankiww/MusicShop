import {createRouter, createWebHistory} from 'vue-router'

import RecordsView from '../views/RecordsView.vue'
import ShopsView from '../views/ShopsView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import SalesView from '../views/SalesView.vue'
import OrdersView from '../views/OrdersView.vue'
import AdminLogin from '../views/AdminLogin.vue'
import RecordDetails from '../views/RecordDetails.vue'
import StoreDetails from '../views/StoreDetails.vue'


const routes = [
    {path: '/', component: RecordsView },
    {path: '/shops', component: ShopsView },
    {path: '/analytics', component: AnalyticsView },
    {path: '/sales', component:  SalesView},
    {path: '/orders', component: OrdersView },
    {path: '/admin', component: AdminLogin },
    {path: '/recordings/:id', component: RecordDetails},
    {path: '/stores/:id', component: StoreDetails}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;