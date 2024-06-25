import userController from "../controllers/user";
import koaRouter from "koa-router";
import { methodType } from "./enum"
import { jwtMiddlewareDeal, platformMiddlewareDeal } from "../middleware/jwt";

const router = new koaRouter();
/** 管理端，需要Token */
router.use(jwtMiddlewareDeal);
const type = "/user";

const routerList = [
    /** 登录 */
    {
        path: `${type}/detail`,
        method: methodType.POST,
        action: userController.getUser,
    },
    {
        path: `${type}/detail`,
        method: methodType.POST,
        action: userController.getUser,
    },
    {
        path: `${type}/detail`,
        method: methodType.POST,
        action: userController.getUser,
    }
]

routerList.forEach((route) => {
    router[route.method](route.path, route.action)
})
export default router;
