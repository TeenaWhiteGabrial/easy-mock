import { Context, Next } from "koa"
import SiteService from '../services/qwen'

class UserController {
    private service: SiteService = new SiteService()
    getMessage = async (ctx: Context, next: Next) => {
        const host = 'localhost:3000'
        const res = await this.service.getOpenAIMessage()
        ctx.body = res
        return next()
    }
}

export default new UserController();