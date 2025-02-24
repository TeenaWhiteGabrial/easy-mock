import { Context, Next } from "koa"
import TaskService from '../services/task'

class TaskController {
    private service: TaskService = new TaskService()
    getSite = async (ctx: Context, next: Next) => {
        const host = 'localhost:3000'
        const res = await this.service.getTaskList()
        ctx.body = res
        return next()
    }
}

export default new TaskController();