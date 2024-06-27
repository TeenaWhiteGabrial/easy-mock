import authController from "../controllers/auth";
import userController from "../controllers/user";
import koaRouter from "koa-router";
import { methodType } from "../type/enum"
import { jwtMiddlewareDeal, platformMiddlewareDeal } from "../middleware/jwt";

const router = new koaRouter();
/** 管理端，需要Token的相关接口 */
router.use(jwtMiddlewareDeal);

const routerList = [
  /** 登出 */
  {
    path: `/auth/logout`,
    method: methodType.POST,
    action: authController.logout,
  },
  /** 获取用户信息 */
  {
    path: `/user/info`,
    method: methodType.POST,
    action: userController.getUser,
  },
  /** 获取角色权限菜单 */
  {
    path: `/user/roles/menus`,
    method: methodType.POST,
    action: userController.getMenus,
  },
]

routerList.forEach((route) => {
  router[route.method](route.path, route.action)
})
export default router;
