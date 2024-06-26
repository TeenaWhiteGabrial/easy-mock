import { Result } from '../utils';
import db from '../db';

const fakeUserInfo = {
  userId: '1',
  username: 'vben',
  realName: 'Vben Admin',
  desc: 'manager',
  password: '123456',
  token: 'fakeToken1',
  roles: [
    {
      roleName: 'Super Admin',
      value: 'super',
    },
  ],
};
export default class UserService {
  async login() {
    return Result.success(fakeUserInfo);
  }

  async getUserInfoById() {
    const collection = db.collection('users');

    // const user = await collection.find(
    //   // 查询条件
    //   {
    //     id: '',
    //   },
    // );
    const user = {
      id: '111'
    }
    return Result.success(user);
  }

  async addUser(userInfo: any) {
    const collection = db.collection('users');
    const res = await collection.insertOne(userInfo);
    console.log('res', res);
    return Result.success('插入成功');
  }
}
