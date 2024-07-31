// 使用 pinia 存放全局的数据，一般是用户信息、风格主题、或者用户本地或者线上的配置
import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      userInfo: null
    };
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    }
  }
});
