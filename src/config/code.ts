export const CODE = {
  // 普通错误code 均为 -1；前端直接捕获-1的错误 抛出
  success: { code: 0, msg: "success", key: "success" },
  missingParameters: {
    code: -1,
    msg: "缺少参数",
    key: "missingParameters",
  },
  tokenFailed: { code: 1, msg: "token校验失败", key: "tokenFailed" },
  adminUserIsExist: {
    code: 3,
    msg: "账号名已存在",
    key: "adminUserIsExist",
  },
  illegalRequest: { code: 4, msg: "非法请求", key: "illegalRequest" },
};
