import { Context, Next } from "koa"
import UserService from '../services/user'

class UserController {
    private service: UserService = new UserService()
    addUser = async (ctx: Context, next: Next) => {
        const data = ctx.request.body
        const res = await this.service.insertUser(data)
        ctx.body = res
        return next()
    }
    deleteUser = async (ctx: Context, next: Next) => {
        const userId = ctx.params.userId

        ctx.body = await this.service.deleteUser(userId)
        return next()
    }
    updateUser = async (ctx: Context, next: Next) => {
        const userId = ctx.params.userid
        const data = ctx.request.body
        const res = await this.service.updateUser(userId, data)
        ctx.body = res
        return next()
    }
    getSimpleUser = async (ctx: Context, next: Next) => {
        const res = await this.service.getSimpleUserInfo(ctx.userId)
        ctx.body = res
        return next()
    }
    getAllUser = async (ctx: Context, next: Next) => {
        const res = await this.service.getAllUserInfo(ctx.userId)
        ctx.body = res
        return next()
    }

    getUserList = async (ctx: Context, next: Next) => {
        const { param, pageNo, pageSize } = ctx.request.body
        const { list, count } = await this.service.getUserList(param, pageNo, pageSize)

        ctx.body = {
            pageData: list,
            total: count
        }
        return next()
    }
    getMenus = async (ctx: Context, next: Next) => {
        const userinfo = await this.service.getAllUserInfo(ctx.userId)

        ctx.body = await this.service.getMenus(userinfo?.role)
        return next()
    }
    getRoleList = async (ctx: Context, next: Next) => {
        const { enabled } = ctx.request.body
        const res = await this.service.getRoleList(enabled)
        ctx.body = res
        return next()
    }

}

export default new UserController();