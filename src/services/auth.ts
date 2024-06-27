import db from '../utils/pool'
import { CODE } from "../config/code";
import { generatorToken } from "../utils/util";

export default class SiteService {
    /** 查询用户名和密码 */
    async checkCertification(username: string, password: string) {
        const cl = db.collection('user-info');
        const site = await cl.findOne({
            username,
            password
        }, {
            projection: { userid: 1 }
        })
        if (site) {
            return {
                token: generatorToken(site.userid)
            }
        } else {
            throw CODE.loginFailer
        }
    }
}