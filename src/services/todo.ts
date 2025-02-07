import db from '../utils/pool'

export default class TimeService {

    /** 根据条件查询待办列表 */
    async getToDoList(currentDay: string) {
        const cl = db.collection('todoList');

        // 查询当前日期的index
    }
} 