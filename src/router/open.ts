import siteController from "../controllers/site"
import koaRouter from "koa-router";
import { methodType } from "./enum"

const router = new koaRouter();
/** 开放接口，不进行校验 */
const type = "/open";

const routerList = [
  /** 获取网站信息 */
  {
    path: `${type}/site/info`,
    method: methodType.GET,
    action: siteController.getSite,
  },
]

routerList.forEach((route) => {
  router[route.method](route.path, route.action)
})
export default router;
