export default{
	namespaced: true,
	state:{
		//登录状态
		loginStatus: false,
		//token
		token: null,
		//用户信息（nickname, users_image）
		userInfo: {}
	},
	getters:{},
	mutations: {
		//一旦进入app，就需要执行这个方法，把用户信息读出来
		initUser(state){
			let userInfo = uni.getStorageInfoSync('userInfo');
			if(userInfo){
				userInfo = JSON.parse(userInfo);
				state.userInfo = userInfo;
				state.loginStatus = true;
				state.token = userInfo.token;
			}
		},
		// 登录后保存用户信息
		login(state, userInfo) {
			console.log('Updating user info:', userInfo); // 调试用
			state.userInfo = userInfo.userInfo;
			state.loginStatus = true;
			state.token = userInfo.token;
			//持久化存储 -> 把对象转换成字符串
			uni.setStorageSync('userInfo', JSON.stringify(userInfo));
		}
	},

	action:{},
}
