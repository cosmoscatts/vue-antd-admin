export default [
  {
    path: '/',
    redirect: '/test',
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '报警信息',
      requiresAuth: true,
      cached: false,
      layout: 'default',
    },
  },
];
