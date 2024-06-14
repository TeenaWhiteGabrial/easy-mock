// 环境变量配置
import { anyKeyObject } from "../type/global";

export const ENV = {
  development: "development",
  production: "production",
};

// mongoDB配置
export const DATABASE = {
  // 本地环境
  development: {
    // dbName: "easy-mock",
    // user: "topaz",
    // password: "iip2021A%3Fptjsb",
    // host: "localhost",
    // port: 27017,
    dbName: "easy-mock",
    user: "topaz",
    password: "ipcMasterTopazzz",
    host: "8.149.128.69",
    port: 27017,
  },

  // 阿里云环境
  production: {
    dbName: "easy-mock",
    user: "topaz",
    password: "ipcMasterTopazzz",
    host: "8.149.128.69",
    port: 27017,
  },
};

// jsonwebtoken-jwt配置
export const JWT = {
  secret: "x", //密钥
  expires: 60 * 60 * 24 * 30, // 30天
};

// sms短信配置
export const SMS = {
  accessKeyId: "x",
  accessKeySecret: "x",
  signName: "x",
  templateCode: "x",
};

// 平台Map
export const PLATFORM = {
  wxMini: "微信小程序",
  wxH5: "微信H5",
  webH5: "webH5",
  dyMini: "抖音小程序",
  ksMini: "快手小程序",
  qqMini: "QQ小程序",
};


// 支付配置
export const PAY = {
  wx: {
    miniAppid: "x",
    h5Appid: "x",
    mchid: "x",
    v3Key: "x", //https://pay.weixin.qq.com/index.php/core/cert/api_cert#/api-password-v3
  },
};

// 支付方式配置
export const PAY_TYPE = [{ label: "微信小程序支付", value: 1 }];
export const WX_MINI = {
  appid: "x",
  secret: "x",
};

// 全局参数
export const FIXED_KEY = {
  port: 8080,
};
