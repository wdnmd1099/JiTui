import { defineComponent, onMounted, PropType, ref } from 'vue';
import s from './PieChart.module.scss';
import * as echarts from 'echarts';
import { http } from '../../shared/Http';
import { Time } from '../../shared/time';
import { refChartChangeType } from '../../shared/Form';
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
    console.log( props.startDate,new Date(`${props.startDate}`))
    new Date('2022-1-1')
    const fetchItemsSummaryTagId = async ()=>{
      const response: any = await http.get('/items/summary', {
        happen_after: new Time(new Date(new Date(`${props.startDate}`).getTime() - (DAY))).format(), //后端返回的数据是不包含当天的，所以开始的要前一天，结束的要后一天，才能获取到预期中的值
        happen_before: new Time(new Date(new Date(`${props.endDate}`).getTime() + (DAY))).format(),
        kind: refChartChangeType.value,
        group_by: 'Tag_id',
      })
    }

    onMounted(() => {
      if (refDiv2.value === undefined) { return }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refDiv2.value);
      // 绘制图表
      const option = {
        grid: [
          { left: 0, top: 0, right: 0, bottom: 20 }
        ],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
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
    })
    return () => (
      <div ref={refDiv2} class={s.wrapper}></div>
    )
  }
})