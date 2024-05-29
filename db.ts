/** 引入驱动包 */
import { MongoClient } from 'mongodb';

/** 创建MongoDB客户端实例 */
const uri = 'mongodb://topaz:iip2021A%3Fptjsb@localhost:27017/?authSource=easy-mock';
const client = new MongoClient(uri);

/** 建立连接 */
client.connect();

/** 连接数据库 */
const db = client.db('easy-mock');
export default db;
 