var User = {
	//查询用户名
	queryUserName(param){
		return "select * from users where nickname = '"+param.username+"' or mobile_phone = '"+param.username+"' ";
	},
	//验证用户名和密码
	queryPassWord(param){
		return "select * from users where nickname = '"+param.username+"' or mobile_phone = '"+param.username+"' and password = '"+param.password+"' ";
	},
	//增加一条用户数据
	insertDate(param){
		return 'insert into users (user_image, nickname, real_name, mobile_phone, email, token) values ("", "", "", "", "", "")';
	}
}

//抛出
exports = module.exports = User;
