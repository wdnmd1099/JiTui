import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import s from './PieChart.module.scss';
import * as echarts from 'echarts';
import { http } from '../../shared/Http';
import { Time } from '../../shared/time';
import { refChartChangeType } from '../../shared/Form';
import { getMoney } from '../../shared/Money';
export const PieChart = defineComponent({
  props: {
    startDate: { //开始日期
      type: String as PropType<string>
    },
    endDate: { // 结束日期
      type: String as PropType<string>
    },
  },
  setup: (props, context) => {
    const refDiv2 = ref<HTMLDivElement>()
    const DAY = 24 * 3600 * 1000 // 一天的毫秒数
    let watchData:any = []
    let data  = ref<any>([{value:100,name:'shit'}])
    const fetchItemsSummaryTagId = async ()=>{
      watchData = []
      const response: any = await http.get('/items/summary', {
        happen_after: new Time(new Date(new Date(`${props.startDate}`).getTime() - (DAY))).format(), //后端返回的数据是不包含当天的，所以开始的要前一天，结束的要后一天，才能获取到预期中的值
        happen_before: new Time(new Date(new Date(`${props.endDate}`).getTime() + (DAY))).format(),
        kind: refChartChangeType.value,
        group_by: 'tag_id',
      })
      const groups = response.data.groups
      groups.map((item:any)=>{
        watchData.push({ value:item.amount, name:item.tag.name })
      })
      data.value = watchData
    }

    
    onMounted(() => {
      fetchItemsSummaryTagId()
      if (refDiv2.value === undefined) { return }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refDiv2.value);
      // 绘制图表
      const option = {
        tooltip:{
          trigger: 'item',
          formatter: (x: {name:string, value:number, percent: number})=>{
            const {name,value,percent} = x
            return `${name}: ￥${getMoney(value)} 占比 ${percent}%`
          }
        },
        grid: [
          { left: 0, top: 0, right: 0, bottom: 20 }
        ],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: data.value,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      watch(()=>data.value,()=>{
        myChart.setOption({
          ...option,
          series: [
            {
              type: 'pie',
              data: data.value
            }
          ]
        })
      })
    })
    watch(() => [refChartChangeType.value, props.startDate, props.endDate], () => { // 改变类型或时间时，重新发请求，触发数据变化重新渲染页面
      fetchItemsSummaryTagId()
    })
    return () => (
      <div ref={refDiv2} class={s.wrapper}></div>
    )
  }
})