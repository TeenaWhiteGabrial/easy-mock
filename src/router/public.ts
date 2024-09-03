import koaRouter from "koa-router";
import { platformMiddlewareDeal } from "../middleware/jwt";

const router = new koaRouter();
/** 识别发送请求的设备处理 */
router.use(platformMiddlewareDeal);
export default router;
