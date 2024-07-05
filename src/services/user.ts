
import db from '../utils/pool'

export default class UserService {

  /** 根据ID查询用户详细信息 */
  async getAllUserInfo(id: string) {
    const cl = db.collection('user-info');
    const user = await cl.findOne({
      userId: id
    }, {
      projection: { userId: 1, userName: 1, avatar: 1, displayName: 1, gender: 1, email: 1, department: 1, role: 1, description: 1, status: 1, identity: 1, level: 1, _id: 0 }
    })
    return user || null
  }

  /** 根据ID查询用户简易信息 */
  async getSimpleUserInfo(id: string) {
    const cl = db.collection('user-info');
    const user = await cl.findOne({
      userId: id
    }, {
      projection: { userId: 1, userName: 1, avatar: 1, displayName: 1, department: 1, role: 1, _id: 0 }
    })
    return user || null
  }

  /** 根据ID删除指定用户 */
  async deleteUser(id: string) {
    const cl = db.collection('user-info');
    const res = await cl.deleteOne({
      userId: parseInt(id)
    })
    if (res.acknowledged && res.deletedCount > 0) {
      return '删除成功'
    } else {
      return `删除失败`
    }
  }

  /** 修改用户 */
  async updateUser(id: string, userInfo: any) {
    const cl = db.collection('user-info');
    const res = await cl.updateOne({
      userId: parseInt(id)
    }, { $set: userInfo })
    if (res.acknowledged) {
      return `更新成功,共影响${res.modifiedCount}条数据`
    } else {
      return `更新失败,查询到${res.matchedCount}条匹配数据`
    }
  }

  /** 根据用户权限查询菜单 */
  async getMenus(role: string) {
    const cl = db.collection('menu-info')
    const cursor = cl.find({
      roles: { $all: [role] },
      type: 'MENU'
    }, {
      projection: { roles: 1, name: 1, code: 1, parentId: 1, path: 1, redirect: 1, icon: 1, component: 1, layout: 1, keepAlive: 1, method: 1, description: 1, show: 1, enable: 1, order: 1, children: 1, type: 1 }
    })

    const res = await cursor.toArray()
    return res
  }

  /** 获取用户列表 */
  async getUserList(param: any, pageNo: number = 1, pageSize: number = 10) {
    const cl = db.collection('user-info');

    const cursor = cl.find(param, {
      projection: { userId: 1, userName: 1, displayName: 1, role: 1, gender: 1, avatar: 1, department: 1, email: 1, status: 1, enable: 1, _id: 0 }
    }).skip(pageSize * (pageNo - 1)).limit(pageSize)
    const list = await cursor.toArray()
    const count = await cl.countDocuments()
    return { list, count }
  }

  /** 新增用户 */
  async insertUser(userInfo: any) {
    const configcl = db.collection('site-info');
    const configInfo = await configcl.findOne()
    const maxId = configInfo?.maxId ?? 0;


    userInfo.userId = maxId + 1
    const cl = db.collection('user-info');
    const res = await cl.insertOne(userInfo)
    if (res.acknowledged) {
      await configcl.updateOne({
        maxId
      }, {
        $set: {
          maxId: maxId + 1
        }
      })
      return '插入成功'
    } else {
      return `插入失败`
    }
  }

  /** 获取角色列表 */
  async getRoleList(enable: boolean) {
    const cl = db.collection('role-info');
    let param: { enable?: boolean } = {}
    if (enable === true || enable === false) {
      param.enable = enable
    }
    const cursor = cl.find(param, {
      projection: { id: 1, code: 1, name: 1, enable: 1 }
    })
    const res = await cursor.toArray()
    return res
  }
} 