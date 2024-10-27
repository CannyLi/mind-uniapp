import App from './App';
import pinia from './stores'; // 导入 pinia


// Vue 3
import { createSSRApp } from 'vue';

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia); // 确保 pinia 被添加为插件
  return { app };
}
