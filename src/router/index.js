// 进行获取用户信息处理，确保在用 token 的情况下用户打开页面一定能获取到用户信息。
import { createRouter, createWebHistory } from 'vue-router';
import cookies from 'js-cookie';
import routes from './routes';
import NProgress from 'nprogress';
import userService from '@/services/user';
import { useStore } from '@/stores/index.js';

const TOKEN_KEY = 'web_token';
const appRouter = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});

// 只触发一次的锁
appRouter.firstInit = false;
appRouter.beforeEach(async (to, from, next) => {
  NProgress.start();

  if (to.meta.title) document.title = to.meta.title;

  const store = useStore();
  const token = cookies.get(TOKEN_KEY);
  // 有 TOKEN 的情况下只请求一次用户信息
  if (token && !appRouter.firstInit) {
    try {
      const userInfo = await userService.getUserInfo();
      store.setUserInfo(userInfo);
      appRouter.firstInit = true;
    } catch (e) {
      next();
    }
  }

  if (!store.userInfo?.id && to.meta.auth) {
    next({ name: 'Home' });
    return;
  }
  next();
});

// eslint-disable-next-line
appRouter.afterEach((to, from) => {
  NProgress.done();
});

export default appRouter;
