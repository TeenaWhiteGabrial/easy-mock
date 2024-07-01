import { Context, Next } from "koa"
import UserService from '../services/user'

class UserController {
    private service: UserService = new UserService()
    insertUser = async (ctx: Context, next: Next) => {
        const data = ctx.request.body
        const res = await this.service.insertUser(data)
        ctx.body = res
        return next()
    };
    deleteUser = async (ctx: Context, next: Next) => {
        const data = ctx.request.body
        const res = await this.service.deleteUser(data.userId)
        ctx.body = res
        return next()
    }
    getUser = async (ctx: Context, next: Next) => {
        const res = await this.service.getUserInfo(ctx.userId)
        ctx.body = res
        return next()
    }
    updateUser = async (ctx: Context, next: Next) => {
        const data = ctx.request.body
        const res = await this.service.updateUser(data.userId, data)
        ctx.body = res
        return next()
    }
    getMenus = async (ctx: Context, next: Next) => {
        const userinfo = await this.service.getUserInfo(ctx.userId)

        ctx.body = await this.service.getMenus(userinfo?.roles)
        return next()
    }
    getUserList = async (ctx: Context, next: Next) => {
        const { gender, username, pageNo, pageSize } = ctx.request.body
        const { list, count } = await this.service.getUserList(gender, username, pageNo, pageSize)

        ctx.body = {
            pageData: list,
            total: count
        }
        return next()
    }
    getRoleList = async (ctx: Context, next: Next) => {
        // const res = await this.service.getRoleList()
    }
}

export default new UserController();