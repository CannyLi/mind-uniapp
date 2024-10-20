const tencentcloud = require("tencentcloud-sdk-nodejs");

// 导入短信模块的client models
const SmsClient = tencentcloud.sms.v20190711.Client;

// 实例化短信服务的client对象
const client = new SmsClient({
	// 为了保护密钥安全，建议将密钥设置在环境变量中或者配置文件中，请参考本文凭证管理章节。
	// 硬编码密钥到代码中有可能随代码泄露而暴露，有安全隐患，并不推荐。
  credential: {
    secretId: process.env.TENCENTCLOUD_SECRET_ID, // 从环境变量中获取
    secretKey: process.env.TENCENTCLOUD_SECRET_KEY, // 从环境变量中获取
  },
  region: "ap-guangzhou", // 根据你的需求修改区域
  profile: {
    signMethod: "TC3-HMAC-SHA256", // 签名方法
    httpProfile: {
      reqMethod: "POST", // 请求方法
      reqTimeout: 30, // 请求超时时间
    },
  },
});

// 生成随机验证码
function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 生成6位随机数
}

// 发送验证码的函数
function sendCodeToPhone(phoneNumber) {
  const code = generateRandomCode(); // 生成验证码
  const params = {
    SmsSdkAppId: process.env.TENCENTCLOUD_SMS_SDK_APP_ID, // 短信 SDK 应用 ID
    Sign: process.env.TENCENTCLOUD_SMS_SIGN, // 短信签名
    TemplateId: process.env.TENCENTCLOUD_SMS_TEMPLATE_ID, // 模板 ID
    TemplateParamSet: [code], // 验证码参数
    PhoneNumberSet: [`+86${phoneNumber}`], // 中国大陆手机号需加国家代码
  };

  return new Promise((resolve, reject) => {
    client.SendSms(params, (err, response) => {
      if (err) {
        return reject(err);
      }
      // 这里可以选择将验证码存储在数据库中
      console.log(`验证码发送成功: ${code}`); // 打印验证码
      resolve(response);
    });
  });
}

module.exports = { sendCodeToPhone };
