import controllers from "../controllers/user";
import koaRouter from "koa-router";
import { platformMiddlewareDeal } from "../middleware/jwt";

const router = new koaRouter();
/** 识别发送请求的设备处理 */
router.use(platformMiddlewareDeal);

const platform = "/game";

const service = {
  global: "",
  user: "/user",
};


// router.post(
//   `${platform}${service.user}/test`,
//   controllers.app_user.testApi,
// );


export default router;
