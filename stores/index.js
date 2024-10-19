// 页面路径：store/index.js

// 用户
import users from '@/stores/modules/users.js';

import { createStore } from 'vuex';

const store = createStore({
  modules: {
    // 模块
	users
  }
});

export default store;
