import { defineComponent, onMounted, PropType, reactive, ref, watch } from "vue";
import { http } from "../../shared/Http";
import { Time } from "../../shared/time";
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
  props: {
    startDate: { //开始日期
      type: String as PropType<string>
    },
    endDate: { // 结束日期
      type: String as PropType<string>
    },
    refData: {
      type: Array as PropType<any>
    },
  },
  setup(props, context) {
    const items = ref<any>([])
    const page = ref(0)
    const DAY = 24 * 3600 * 1000 // 一天的毫秒数
    const fetchItems: any = async () => {
      if (!props.startDate || !props.endDate) { return }
      for (let i = 1; i < 30; i++) {
        const response: any = await http.get('/items', { // 获取账目
          happen_after: new Time(new Date(new Date(`${props.startDate}`).getTime() - (DAY))).format(), //后端返回的数据是不包含当天的，所以开始的要前一天，结束的要后一天，才能获取到预期中的值
          happen_before: new Time(new Date(new Date(`${props.endDate}`).getTime() + (DAY))).format(),
          page: page.value + 1,
        })
        const { resources } = response.data
        items.value?.push(...resources)
        page.value += 1
        if (resources.length < 25) {  // resources 是具体的账目，如果resources的账目少于25，说明没有下一页数据了，就可以退出循环了
          return
        }
      }
    }
    onMounted(fetchItems)

    watch(()=>[props.startDate,props.endDate],()=>{
      page.value = 0
      items.value = []
      fetchItems()
    })




    
    const itemsBalance = reactive({
      expenses: 0, income: 0, balance: 0
    })
    const fetchItemsBalance =async ()=>{
      if(!props.startDate || !props.endDate){ return }
      const response = await http.get('/items/balance', {
        happen_after: new Time(new Date(new Date(`${props.startDate}`).getTime() - (DAY))).format(), //后端返回的数据是不包含当天的，所以开始的要前一天，结束的要后一天，才能获取到预期中的值
        happen_before: new Time(new Date(new Date(`${props.endDate}`).getTime() + (DAY))).format(),
        page: page.value + 1,
      })
      Object.assign(itemsBalance, response.data)
    }
    onMounted(fetchItemsBalance)

    watch(()=>[props.startDate,props.endDate], ()=>{
      Object.assign(itemsBalance, {
        expenses: 0, income: 0, balance: 0
      })
      fetchItemsBalance()
    })

    return () => (<>
      <div class={s.outsideWrapper}>
        <div class={s.hiddenDiv}></div>
        <div class={s.total}>
          <li class={s.income}>
            <span>收入</span>
            <span>￥ {(itemsBalance.income/100).toFixed(2)}</span>
          </li>
          <li class={s.expenditure}>
            <span>支出</span>
            <span>￥ {(itemsBalance.expenses/100).toFixed(2)}</span>
          </li>
          <li class={s.netIncome}>
            <span>净收入</span>
            <span>￥ {(itemsBalance.balance/100).toFixed(2)}</span>
          </li>
        </div>
        {items.value?.map((item: {
          kind: any; tags: any; happen_at: any; id: any; amount: any;
        }) => {
          const time = item.happen_at.match(/^.{10}/gm)[0]
            + " " + item.happen_at.match(/.{2}:.{2}:.{2}/gm)[0];
          //  console.log(item)
          return (
            <div class={s.wrapper} onClick={() => { console.log(props.startDate, props.endDate) }}>
              <div class={s.emoji}>{item.tags[0].sign}</div>
              <span class={s.id}>
                {item.tags[0].name}
              </span>
              <span class={s.time}>{time}</span>
              <span class={[s.money, [item.kind === 'expenses' ? '' : s.IncomeMoney]]}>￥ {item.amount / 100}</span>
            </div>
          )
        }
        )
        }
        <div>{context.slots?.default?.()}</div>
      </div>
    </>
    )
  }
})