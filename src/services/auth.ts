import db from '../utils/pool'
import { CODE } from "../config/code";

export default class SiteService {
    /** 查询用户名和密码 */
    async checkCertification(username: string, password: string) {
        const cl = db.collection('user-info');
        const site = await cl.findOne({
            username,
            password
        })
        if (site) {
            return '登录成功'
        } else {
            throw CODE.adminUserNoExist
        }
    }
}