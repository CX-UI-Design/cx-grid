const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const navigationRouter = [
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/alert',
    name: '消息通知',
    children: [
      {
        path: 'alert',
        component: () => import('../../pages/Notice/Alert/Alert'),
        meta: { auth: true, key: 'steps' },
        name: 'alert',
      }
    ],
  },
];