import './assets/css/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// 在 main.js 中引用 Element Plus、配置 svg-icon-registe

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'; //导入路径
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/Common/SvgIcon.vue'; //导入自定义的SVG图标组件，通常位于项目的components目录下，用于在应用中展示SVG图标

const app = createApp(App); //创建一个Vue应用实例，App通常是根组件，通常定义在src/App.vue中。

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  locale: zhCn
});
app.component('SvgIcon', SvgIcon); //注册全局的SvgIcon组件，使得在应用的任何地方都可以使用<SvgIcon>标签。
app.mount('#app');
