const routes = [
    {
        path: '/teacher',
        name: 'index',
        component:  (() => import(/* webpackChunkName: 'teacher-teacher' */ './page/index.vue')),
    },
];

export default routes;
