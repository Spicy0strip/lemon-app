import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/modules/home/pages/login.vue'
import Home from '@/modules/home/pages/index.vue'

Vue.use(Router)

export default new Router({
  	routes: [
		{
			path: '/',
			name: 'index',
			component: Home,
			redirect: '/login',
			children: [
                {
                    path: 'product',
                    name: 'product',
                    component: (() =>
                    import(/* webpackChunkName: 'product' */ '@/modules/product/pages/index.vue')),
                },
                {
                    path: 'order',
                    name: 'order',
                    component: (() =>
                    import(/* webpackChunkName: 'order' */ '@/modules/order/pages/index.vue')),
                },
                {
                    path: 'address',
                    name: 'address',
                    component: (() =>
                    import(/* webpackChunkName: 'address' */ '@/modules/address/pages/index.vue')),
                }
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
	]
});
