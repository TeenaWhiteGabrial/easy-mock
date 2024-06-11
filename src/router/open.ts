import userController from "../controllers/user";
import siteController from "../controllers/site"
import koaRouter from "koa-router";
import { methodType } from "./enum"

const router = new koaRouter();
/** 开放接口，不进行校验 */
const type = "/open";
const service = "/user"


const routerList = [
  {
    path: `${type}/user/info`,
    method: methodType.POST,
    action: userController.getUser,
  },
  {
    path: `${type}/user/insert`,
    method: methodType.POST,
    action: userController.insertUser,
  },
  {
    path: `${type}/user/delete`,
    method: methodType.POST,
    action: userController.deleteUser,
  },
  {
    path: `${type}/user/update`,
    method: methodType.POST,
    action: userController.updateUser,
  },
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
