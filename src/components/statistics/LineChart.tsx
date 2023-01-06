
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import s from './LineChart.module.scss';
import * as echarts from 'echarts';
import { Time } from '../../shared/time';
import { getMoney } from '../../shared/Money';
import { http } from '../../shared/Http';
import { refChartChangeType } from '../../shared/Form';

const echartsOption = {
  tooltip: {  //点击后出现选中天的支出总额
    show: true,
    trigger: 'axis',
    formatter: ([item]: any) => {
      const [x, y] = item.data
      return `${new Time(new Date(x)).format('YYYY年MM月DD日')} ￥${getMoney(y)}`
    },
  },
  grid: [{ left: 16, top: 20, right: 16, bottom: 20 }],  // 边距
  xAxis: { //x轴的参数
    type: 'time', //类型时间
    boundaryGap: ['3%', '0%'], //左右多显示多少时间
    axisLabel: {
      formatter: (value: string) => new Time(new Date(value)).format('MM-DD'),
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    show: true,
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
    axisLabel: {
      show: false,
    },
  },
}

export const LineChart = defineComponent({
  props: {
    startDate: { //开始日期
      type: String as PropType<string>
    },
    endDate: { // 结束日期
      type: String as PropType<string>
    },
  },
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>()
    let chart: echarts.ECharts | undefined = undefined
    const data = ref<any>([])
    let watchData: any = []
    const fetchItemsSummary = async () => {
      if (!props.startDate || !props.endDate) { return }
      const response: any = await http.get('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: refChartChangeType.value,
        group_by: 'happen_at',
      })
      const groups = response.data.groups
      watchData = []
      groups.map((item: any) => {
        watchData.push([item.happen_at, item.amount]) // 因为push 不改变地址，不能使watch生效，用个中间变量赋值触发watch的重新渲染页面
      })
      data.value = watchData
    }

    onMounted(() => {
      fetchItemsSummary()
      if (refDiv.value === undefined) { return }
      // 基于准备好的dom，初始化echarts实例
      chart = echarts.init(refDiv.value);
      // 绘制图表
      chart.setOption({
        ...echartsOption,
        series: [{
          data: data.value,  // 此时获取的是空值，需要获取到数据后靠watch触发重新渲染页面
          type: 'line'
        }]
      });
    })

    watch(() => data.value, () => {
      // console.log('变了')
      chart!.setOption({  // 重新渲染页面
        series: [{
          data: data.value,
        }]
      })
    })

    watch(() => refChartChangeType.value, () => {
      fetchItemsSummary()
    })

    return () => (
      <div ref={refDiv} class={s.wrapper}></div>
    )
  }
})