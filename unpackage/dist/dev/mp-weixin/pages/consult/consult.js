"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      messages: [],
      inputMessage: ""
    };
  },
  methods: {
    sendMessage() {
      if (this.inputMessage.trim() !== "") {
        const message = { text: this.inputMessage, isUser: true };
        this.messages.push(message);
        this.inputMessage = "";
        this.getAIChatResponse(message.text).then((aiResponse) => {
          this.messages.push({ text: aiResponse, isUser: false });
        }).catch((error) => {
          console.error("获取AI回复失败：", error);
        });
      } else {
        console.log("输入框为空，未发送消息");
      }
    },
    getAIChatResponse(message) {
      return new Promise((resolve, reject) => {
        const requestData = {
          perception: {
            inputText: {
              text: message
            }
          }
        };
        common_vendor.index.request({
          url: "http://localhost:3000/api/aiconsult",
          method: "POST",
          data: requestData,
          success: (response) => {
            if (response.data && response.data.results && response.data.results[0].values) {
              resolve(response.data.results[0].values.text);
            } else {
              reject("响应格式错误");
            }
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.messages, (msg, index, i0) => {
      return {
        a: msg.isUser ? "/static/images/Swiper/swiper1.jpg" : "/static/images/Swiper/swiper1.jpg",
        b: common_vendor.n({
          "user-avatar": msg.isUser,
          "ai-avatar": !msg.isUser
        }),
        c: common_vendor.t(msg.text),
        d: index,
        e: msg.isUser ? 1 : "",
        f: !msg.isUser ? 1 : ""
      };
    }),
    b: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args)),
    c: $data.inputMessage,
    d: common_vendor.o(($event) => $data.inputMessage = $event.detail.value),
    e: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
