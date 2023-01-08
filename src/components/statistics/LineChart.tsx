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
    type: 'category', //类型
    boundaryGap: ['3%', '0%'], //左右多显示多少时间
    axisLabel: {
      formatter: (value: string, amount: number) => new Time(new Date(value)).format('MM-DD'),
    },
    axisTick: {
      alignWithLabel: true,
    },
    splitArea: {
      show: false
    }
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
    const DAY = 24 * 3600 * 1000 // 一天的毫秒数
    let watchData: any = []

    const fetchItemsSummary = async () => {
      if (!props.startDate || !props.endDate) { return }
      const response: any = await http.get('/items/summary', {
        happen_after: new Time(new Date(new Date(props.startDate).getTime() - (DAY))).format(), //后端返回的数据是不包含当天的，所以开始的要前一天，结束的要后一天，才能获取到预期中的值
        happen_before: new Time(new Date(new Date(props.endDate).getTime() + (DAY))).format(),
        kind: refChartChangeType.value,
        group_by: 'happen_at',
      })
      const groups = response.data.groups // 获取的记账数据
      watchData = [] // 重置数组，避免数据重叠
      let startDay = props.startDate
      const nextDay = () => new Time(new Date(new Date(startDay).getTime() + (DAY))).format() // +1天日期
      if (!props.startDate || !props.endDate) { return }
      const diff = (new Date(props.endDate).getTime() - new Date(props.startDate).getTime()) / DAY // 开始时间和结束时间相差几天
      if (diff > 31) { // 大于31天的数据直接只显示有记账数据的，没有记账数据的日子不展示
        groups.map((item: any) => {
          watchData.push([item.happen_at, item.amount]) // 因为push 不改变地址，不能使watch生效，用个中间变量赋值触发watch的重新渲染页面
        })
      } else { // 小于31天全展示
        for (let i = 0; i < diff; i++) {
          if(!watchData[0]){  // 解决第一天数据获取错误或不展示的bug
            watchData.push([`${new Time(new Date(props.startDate)).format()}`, 0])
          }
          watchData.push([nextDay(), 0])
          startDay = nextDay()
        }
        groups.map((item: any) => { // groups 是获取的数据
          watchData.map((watchDataItem: any) => {
            if (item.happen_at === watchDataItem[0]) { // 遍历初始化好的工具数组，有和groups的日期相同的，修改它的钱
              watchDataItem[1] = item.amount
            }
          })
        })
      }
      data.value = watchData   // 因为push 不改变地址，不能使watch生效，用个中间变量赋值触发watch的重新渲染页面
      // console.log(data.value)
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

    watch(() => data.value, () => { // 第一次渲染是获取不到数据的，因为数据是渲染后才获得的数据，所以当获取到数据时，data.value改变，触发watch，重新渲染页面，这个是让页面能拿到数据热更新的重点
      // console.log('变了')
      // console.log(data.value)
      chart!.setOption({  // 重新渲染页面
        ...echartsOption, //这个拷贝配置很重要，不这样做重新渲染的图是有bug的，主要是因为x轴的 type: 'category' 会改变掉
        series: [{
          data: data.value,
          type: 'line',
        }]
      })
    })

    watch(() => [refChartChangeType.value, props.startDate, props.endDate], () => { // 改变类型或时间时，重新发请求，触发数据变化重新渲染页面
      fetchItemsSummary()
    })

    return () => (
      <div ref={refDiv} class={s.wrapper}></div>
    )
  }
})