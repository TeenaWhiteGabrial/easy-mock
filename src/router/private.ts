import koaRouter from "koa-router";
import { jwtMiddlewareDeal, platformMiddlewareDeal } from "../middleware/jwt";

const router = new koaRouter();
/** 私密接口，需要校验token和platform */
router.use(platformMiddlewareDeal);
router.use(jwtMiddlewareDeal);

export default router;
