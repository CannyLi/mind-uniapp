var express = require('express');
var router = express.Router();
//引入数据库
var connection = require('../db/sql.js');
var user = require('../db/UserSql.js');
var carousel = require('../routes/carousel.js');
var articles = require('../routes/articles.js');
var doctors = require('../routes/doctors.js');

 // 引入发送验证码的函数
// const { sendCodeToPhone } = require('../utils/sendCode.js'); 

//测试接口
// router.get('/test', function(req, res, next) {
// 	connection.query("select * from users", function(error, results, fields){
// 		if(error) throw error;
// 		console.log('The solution is: ', results);
// 	});
// });

// 使用轮播图路由
router.use('/api', carousel); // 确保使用的前缀是/api

//使用文章信息路由
router.use('/api', articles);

//使用医生信息路由
router.use('/api', doctors);


// 发送验证码
// router.post('/api/code', function(req, res, next) {
//   const mobilePhone = req.body.username;
//   const code = generateRandomCode(); // 生成验证码

//   // 发送验证码
//   sendCodeToPhone(mobilePhone, code)
//     .then(() => {
//       // 可以将验证码存储在数据库或内存中，稍后验证用
//       res.send({
//         success: true,
//         msg: '验证码已发送',
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         success: false,
//         msg: '验证码发送失败，请稍后重试',
//       });
//     });
// });




// /// 用户注册接口(手机号验证)
// router.post('/api/registered', function(req, res, next) {
//   let params = {
//     username: req.body.username,
//   };
  
//   connection.query(user.queryUserName(params), function(error, results) {
//     if (error) {
//       res.status(500).send({
//         data: {
//           success: false,
//           msg: "服务器错误，请稍后再试。",
//         },
//       });
//       return;
//     }
    
//     if (results.length > 0) {
//       res.send({
//         success: false,
//         msg: "该手机号已被注册。",
//       });
//     } else {
//       res.send({
//         success: true,
//       });
//       // 这里可以调用发送验证码的函数
//     }
//   });
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

module.exports = router;

