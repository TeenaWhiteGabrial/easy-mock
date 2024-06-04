import db from '../utils/pool'

export default class UserService {
  async insertUser(userInfo: any) {
    const cl = db.collection('users');
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
    const cl = db.collection('users');
    const user = await cl.findOne({
      userId: id
    }, {
      projection: { userId: 1, username: 1, realName: 1, avatar: 1, token: 1, _id: 0 }
    })

    return user || null
  }

  /** 根据ID删除指定用户 */
  async deleteUser(id: string) {
    const cl = db.collection('users');
    const res = await cl.deleteOne({
      userId: id
    })
    if (res.acknowledged && res.deletedCount > 0) {
      return '删除成功'
    } else {
      return `删除失败`
    }
  }
  async updateUser(id: string, userInfo: any) {
    const cl = db.collection('users');
    const res = await cl.updateOne({
      userId: id
    }, { $set: userInfo })
    if (res.acknowledged) {
      return `更新成功,共影响${res.modifiedCount}条数据`
    } else {
      return `更新失败,查询到${res.matchedCount}条匹配数据`
    }
  }
}