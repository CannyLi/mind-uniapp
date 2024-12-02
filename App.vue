<script>
import { useUserStore } from '@/stores/modules/userStore.js'; 

export default {
  setup() {
    const userStore = useUserStore();
    userStore.initUser(); // 调用 initUser 方法

    return {};
  },
  onLaunch() {
    console.log('App Launch');
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  }
};
</script>

<style>
	/*每个页面公共css */
	@import 'common/uni.css';
	@import 'static/iconfont/iconfont.css';
	@import 'common/common.css';
</style>