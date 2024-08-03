import BasicLayout from '@/components/Layout/BasicLayout.vue';
import Home from '@/views/HomeIndex.vue';
import NotFound from '@/views/Common/NotFound.vue';
import AccessDenied from '@/views/Common/AccessDenied.vue';
// import routesAcademy from './routesAcademy';
import AccountLogin from '@/views/Common/AccountLogin.vue';
import routesPermission from './routesPermission';
import routesArticle from './routesArticle';

export default [
  {
    path: '/',
    name: 'Root',
    component: BasicLayout,
    redirect: {
      name: 'Home'
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      ...routesArticle,
      ...routesPermission
    ]
  },
  {
    path: '/login',
    name: 'AccountLogin',
    component: AccountLogin
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  // 403无权限
  {
    path: '/403',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
];
