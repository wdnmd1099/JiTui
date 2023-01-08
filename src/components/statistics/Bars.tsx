import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import { refChartChangeType } from '../../shared/Form';
import { http } from '../../shared/Http';
import { Money } from '../../shared/Money';
import { Time } from '../../shared/time';
import s from './Bars.module.scss';
export const Bars = defineComponent({
  props: {
    startDate: { //开始日期
      type: String as PropType<string>
    },
    endDate: { // 结束日期
      type: String as PropType<string>
    },
  },
  setup: (props, context) => {
    const DAY = 24 * 3600 * 1000 // 一天的毫秒数
    let watchData:any = []
    let data  = ref([{ tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 }])
    const fetchItemsSummaryTagId = async ()=>{
      watchData = []
      const response: any = await http.get('/items/summary', {
        happen_after: props.startDate, 
        happen_before: props.endDate,
        kind: refChartChangeType.value,
        group_by: 'tag_id',
      })
      const groups = response.data.groups
      // console.log(groups)
      groups.map((item:any)=>{
        watchData.push({tag:{ id:item.tag.id, name:item.tag.name, sign:item.tag.sign}, amount:item.amount})
      })
      data.value = watchData
      // console.log(data.value)
    }

    onMounted(()=>{
      fetchItemsSummaryTagId()
    })
   
   
    

    const betterData3 = computed(() => {
      const total = data.value.reduce((sum, item) => sum + item.amount, 0)
      // console.log(total)
      return data.value.map(item => ({
        ...item,
        percent: Math.round(item.amount / total * 100)
      }))
    })
    watch(() => [refChartChangeType.value, props.startDate, props.endDate], () => { // 改变类型或时间时，重新发请求，触发数据变化重新渲染页面
      fetchItemsSummaryTagId()
    })


    return () => (
      <div class={s.wrapper}>
        {(betterData3.value && betterData3.value.length > 0) ?
          betterData3.value.map(({ tag, amount, percent }) => {
            return (
              <div class={s.topItem}>
                <div class={s.sign}>
                  {tag.sign}
                </div>

                <div class={s.bar_wrapper}>
                  <div class={s.bar_text}>
                    <span> {tag.name} - {percent}% </span>
                    <span> ￥<Money value={amount}/> </span>
                  </div>
                  <div class={s.bar}>
                    <div class={s.longBG}>
                      <div class={s.bar_inner} style={{width: `${percent}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }): <div class={s.noData}>没有数据</div>
        }
        </div>
    )
  }
})