import { reactive } from "vue";

/* 
  example
  import { Time } from 'shared/time';
  const time = new Time();
  time.format('YYYY-MM-DD');
  time.firstDayOfMonth();
  time.firstDayOfYear();
  time.lastDayOfMonth();
  time.lastDayOfYear();
  time.add(1, 'month');
*/
export class Time {
  date: Date;
  constructor(date = new Date()) {
    this.date = date;
  }
  format(pattern = 'YYYY-MM-DD') {
    // 目前支持的格式有 YYYY MM DD HH mm ss SSS
    const year = this.date.getFullYear()
    const month = this.date.getMonth() + 1
    const day = this.date.getDate()
    const hour = this.date.getHours()
    const minute = this.date.getMinutes()
    const second = this.date.getSeconds()
    const msecond = this.date.getMilliseconds()
    return pattern.replace(/YYYY/g, year.toString())
      .replace(/MM/, month.toString().padStart(2, '0'))
      .replace(/DD/, day.toString().padStart(2, '0'))
      .replace(/HH/, hour.toString().padStart(2, '0'))
      .replace(/mm/, minute.toString().padStart(2, '0'))
      .replace(/ss/, second.toString().padStart(2, '0'))
      .replace(/SSS/, msecond.toString().padStart(3, '0'))
  }
  firstDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0));
  }
  firstDayOfYear() {
    return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0));
  }
  lastDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0));
  }
  lastDayOfYear() {
    return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0));
  }
  getRaw() {
    return this.date
  }
  add(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond') {
    // return new Time but not change this.date
    let date = new Date(this.date.getTime());
    switch (unit) {
      case 'year':
        const currentDate = date.getDate()
        date.setDate(1)
        date.setFullYear(date.getFullYear() + amount)
        const targetDate = new Date(
          date.getFullYear(),
          date.getMonth() + 1, 0, 0, 0, 0,).getDate()
        date.setDate(Math.min(currentDate, targetDate))
        break;
      case 'month':
        //js的加1个月是按照这个月已经过了几天，然后把这个数加到时间上，比如你在1月31日加一个月
        //它就是1月31日加31日，因为2月只有28天或29天，所以月份就会直接跳到3月
        //所以加月份的时候要重置 日（day），重置成1日，那么哪怕你加31日，也最多是2月的某一日，不会跳到3月，保证了月是对的
        //然后因为改变了日，所以保证了月是对的之后把日改回正确的，比如2022.1.31，加一个月是2月的28日
        const d = date.getDate()  //2022.3.1   
        date.setDate(1) 
        date.setMonth(date.getMonth() + amount); 
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0).getDate()
        date.setDate(Math.min(d, d2))
        break;
      case 'day':
        date.setDate(date.getDate() + amount);
        break;
      case 'hour':
        date.setHours(date.getHours() + amount);
        break;
      case 'minute':
        date.setMinutes(date.getMinutes() + amount);
        break;
      case 'second':
        date.setSeconds(date.getSeconds() + amount);
        break;
      case 'millisecond':
        date.setMilliseconds(date.getMilliseconds() + amount);
        break;
      default:
        throw new Error('Time.add: unknown unit');
    }
    return new Time(date)
  }

}




export const time = reactive([
  {
    startDay: new Time().firstDayOfMonth().format(),  //本月
    endDay: new Time().lastDayOfMonth().format()
  },
  {
    startDay: new Time().add(-1, 'month').firstDayOfMonth().format(), // 上月
    endDay: new Time().add(-1, 'month').lastDayOfMonth().format() 
  },
  {
    startDay: new Time().firstDayOfYear().format(),  //今年
    endDay: new Time().lastDayOfYear().format()
  },
  {
    startDay: new Time().add(-2, 'month').firstDayOfMonth().format(),  //三个月
    endDay: new Time().format(),
  },
])










































// export const time = (date = new Date()) => {
//     const api = {
//       format: (pattern = 'YYYY-MM-DD')=>{
//         // 目前支持的格式有 YYYY MM DD HH mm ss SSS
//         //https://dayjs.gitee.io/docs/zh-CN/display/format
//         const year = date.getFullYear()
//         const month = date.getMonth() + 1
//         const day = date.getDate()
//         const hour = date.getHours()
//         const minute = date.getMinutes()
//         const second = date.getSeconds()
//         const msecond = date.getMilliseconds()
//         return pattern.replace(/YYYY/g, year.toString())
//           .replace(/MM/, month.toString().padStart(2, '0'))
//           .replace(/DD/, day.toString().padStart(2, '0'))
//           .replace(/HH/, hour.toString().padStart(2, '0'))
//           .replace(/mm/, minute.toString().padStart(2, '0'))
//           .replace(/ss/, second.toString().padStart(2, '0'))
//           .replace(/SSS/, msecond.toString().padStart(3, '0'))
//       },
//       // Date 接收（年，月，日，小时，分钟，秒，毫秒），firstDayMonth是返回当前年，当前月，1日，0时，0分，0秒
//       firstDayMonth:()=>{ //本月1日
//         const firstDay = new Date(date.getFullYear(),date.getMonth(),1,0,0,0) 
//         return firstDay;
//       },
//       lastDayOfMonth:()=>{ //本月最后一日
//         const lastDay = new Date(date.getFullYear(),date.getMonth() + 1 ,0,0,0,0)
//         return lastDay;
//       },
//       firstDayOfLastMonth:()=>{ //上个月的第一日
//         const firstDay = new Date(date.getFullYear(),date.getMonth() - 1 ,1,0,0,0)
//         return firstDay;
//       },
//       lastDayOfLastMonth:()=>{  //上个月的最后一日
//         const lastDay = new Date(date.getFullYear(),date.getMonth(),0,0,0,0)
//         return lastDay;
//       },
//       lastDayOfYear:()=>{ // 本年的最后一日
//         const lastDay = new Date(date.getFullYear() + 1,0,0,0,0,0)
//         return lastDay;
//       },
//       fistDayOfYear:()=>{ // 本年第一日
//         const firstDay = new Date(date.getFullYear() + 1,0,1,0,0,0)
//         return firstDay;
//       },
//     }
//     return api
//   }
  
// export const time = (xxx = date)=>{return xxx}

//          let date = new Date(now)
//         //  let xxx = date.toLocaleDateString()
//         //  xxx = xxx.replace(/[\/]+/g,'-')
//          console.log(date)
        
     
