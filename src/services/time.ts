import db from '../utils/pool'

export default class TimeService {

    /** 获取下一个节假日 */
    async getNextHolidayInfo(currentDay:string) {
        const cl = db.collection('holiday-info');
        

        // 查询条件：日期大于等于当前日期，且stateNum为2
        const query = {
            date: { $gte: currentDay },
            stateNum: "2" // 法定节假日
        }
        // 按日期升序排序
        const nextHoliday = await cl.findOne(query, {
            sort: { date: 1 },
            projection: { date: 1,stateText:1,_id:0 }
        })
        // 将当前日期转换为整数，计算日期
        const currentDayInt = parseInt(currentDay, 10);
        const diffDays = nextHoliday?.date - currentDayInt
        
        if (diffDays === 0){
            return `今天是【${nextHoliday?.stateText}】,假期愉快~`
        } else if (diffDays === 1){
            return `加油！明天就是【${nextHoliday?.stateText}】了！`
        } else if (diffDays === 2){
            return `再坚持一下！后天就是【${nextHoliday?.stateText}】了！`
        } else {
            return `距离【${nextHoliday?.stateText}假期】还有【${diffDays}】天`
        }

    }

    /** 获取下个周末 */
    async getNextWeekend(){

    }
} 