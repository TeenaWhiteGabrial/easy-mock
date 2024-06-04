import controllers from "../controllers/user";
import koaRouter from "koa-router";
import { methodType } from "./enum"

const router = new koaRouter();
/** 开放接口，不进行校验 */
const type = "/open";
const service = "/user"


const routerList = [
  {
    path: `${type}${service}/info`,
    method: methodType.POST,
    action: controllers.getUser,
  },
  {
    path: `${type}${service}/insert`,
    method: methodType.POST,
    action: controllers.insertUser,
  },
  {
    path: `${type}${service}/delete`,
    method: methodType.POST,
    action: controllers.deleteUser,
  },
  {
    path: `${type}${service}/update`,
    method: methodType.POST,
    action: controllers.updateUser,
  },
]

routerList.forEach((route) => {
  router[route.method](route.path, route.action)
})
export default router;
