import UserService from '../service/UserService';
import {Context} from 'koa'

class UserController {
  private service: UserService = new UserService();

  login = async (ctx: Context) => {
    ctx.body = await this.service.login();
  };

  getUserInfoById = async (ctx: Context) => {
    ctx.body = await this.service.getUserInfoById();
  };
  addUser = async (ctx: Context) => {
    const postData = ctx.request.body;
    console.log(`koaBody获取到的post数据===>`, postData);
    ctx.body = await this.service.addUser(postData);
  };
}

export default new UserController();
