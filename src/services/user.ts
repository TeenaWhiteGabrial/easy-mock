import db from '../utils/pool'

export default class UserService {
  async insertUser(userInfo: any) {
    const cl = db.collection('user-info');
    const res = await cl.insertOne(userInfo)
    console.log('res', res)
    if (res.acknowledged) {
      return '插入成功'
    } else {
      return `插入失败`
    }
  }
  /** 按照ID查询用户信息 */
  async getUserInfo(id: string) {
    const cl = db.collection('user-info');
    const user = await cl.findOne({
      id: id
    }, {
      projection: { id: 1, username: 1, nickName: 1, roles: 1, gender: 1, avatar: 1, address: 1, email: 1, _id: 0 }
    })

    return user || null
  }

  /** 根据ID删除指定用户 */
  async deleteUser(id: string) {
    const cl = db.collection('user-info');
    const res = await cl.deleteOne({
      userId: id
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
      userId: id
    }, { $set: userInfo })
    if (res.acknowledged) {
      return `更新成功,共影响${res.modifiedCount}条数据`
    } else {
      return `更新失败,查询到${res.matchedCount}条匹配数据`
    }
  }

  /** 根据用户权限查询菜单 */
  async getMenus(role: string) {
    const cl = db.collection('role-info')
    const cursor = cl.find({
      roles: { $all: [role] },
      type: 'MENU'
    }
      , {
        projection: { roles: 1, name: 1, code: 1, parentId: 1, path: 1, redirect: 1, icon: 1, component: 1, layout: 1, keepAlive: 1, method: 1, description: 1, show: 1, enable: 1, order: 1, children: 1, type: 1 }
      }
    )

    const res = await cursor.toArray()
    return res
  }
} 