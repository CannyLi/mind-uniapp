var express = require('express');
var router = express.Router();
//引入数据库
var connection = require('../db/sql.js');
var user = require('../db/UserSql.js');

//测试接口
// router.get('/test', function(req, res, next) {
// 	connection.query("select * from users", function(error, results, fields){
// 		if(error) throw error;
// 		console.log('The solution is: ', results);
// 	});
// });


//用户登录接口
router.post('/api/login', function(req, res, next){
	//前端给后端的数据
	let params = {
		username : req.body.username,
		password : req.body.password
	}
	//查询用户名和手机号是否存在
		connection.query(user.queryUserName( params ), function(error, results, fields){
			if (error) {
			    res.status(500).send({
			    data: {
			        success: false,
			        msg: "服务器错误，请稍后再试。"
					}
				});
				return;
			}
			if(results.length > 0){
				connection.query(user.queryPassWord( params ), function(err, result){
					if(result.length > 0){
						res.send({
							data:{
								success: true,
								msg: "登录成功！",
								data: result[0]
							}
						})
					}else{
						res.send({
							data:{
								success: false,
								msg: "密码错误！"
							}
						});
					}
				});
			}else{
				res.send({
					data:{
						success: false,
						msg: "用户名或手机号不存在！"
					}
				});
			}
		});
});



//用户注册接口(手机号验证)
router.post('/api/registered', function(req, res, next){
	//前端给后端的数据
	let params = {
		username : req.body.mobile_phone
		
	}
	//查询用户名和手机号是否存在
		connection.query(user.queryUserName( params ), function(error, results, fields){
			if (error) {
			    res.status(500).send({
			    data: {
			        success: false,
			        msg: "服务器错误，请稍后再试。"
					}
				});
				return;
			}
			
			if(results.length > 0){
				res.send({
					success: false,
					msg: "该手机号已被注册。"
				})
			}else{
				res.send({
					success: true
				})
			}
			
			//发送验证码逻辑
			

		});
});









// //获取轮播图列表的接口
// router.get('/api/index_list/banner', function(req, res, next) {	
	
// });

// //获取文章列表的接口
// router.get('/api/index_list/articles', function(req, res, next) {	
// 	try {
// 	    const articles = await db.query('SELECT * FROM articles');
// 	    res.json(articles);
// 	} catch (error) {
// 	    res.status(500).send('Server error');
// 	}
// });


// //获取医生列表的接口
// router.get('/api/index_list/doctors', function(req, res, next) {	
	
// });


// //获取预约表的接口
// router.get('/api/index_list/users', function(req, res, next) {	
	
// });




module.exports = router;

