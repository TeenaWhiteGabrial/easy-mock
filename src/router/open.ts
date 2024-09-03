import siteController from "../controllers/qwen"
import koaRouter from "koa-router";
import { methodType } from "./enum"

const router = new koaRouter();
/** 开放接口，不进行校验 */
const type = "/open";

const routerList = [
  /** websocket通信 */
  {
    path: `${type}/ai/getMessage`,
    method: methodType.GET,
    action: siteController.getMessage,
  },
]

routerList.forEach((route) => {
  router[route.method](route.path, route.action)
})
export default router;
