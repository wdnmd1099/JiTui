import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import { http } from "../../shared/Http";
import { refExpensesMoney, refIncomeMoney } from "./ItemList";
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

    const fetchItems: any = async () => {
      if (!props.startDate || !props.endDate) { return }
      for (let i = 1; i < 6; i++) {
        const response: any = await http.get('/items', {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: page.value + 1,
        })
        const { resources, pager } = response.data
        items.value?.push(...resources)
        page.value += 1
        if (pager.count < 25) {
          return
        }
      }
    }
    onMounted(fetchItems)

    watch(()=>[props.startDate,props.endDate],()=>{
      page.value = 0
      items.value = []
      console.log(props.startDate,props.endDate)
      fetchItems()

    })


    return () => (<>
      <div class={s.outsideWrapper}>
        <div class={s.hiddenDiv}></div>
        <div class={s.total}>
          <li class={s.income}>
            <span>收入</span>
            <span>￥ {refIncomeMoney.value.toFixed(2)}</span>
          </li>
          <li class={s.expenditure}>
            <span>支出</span>
            <span>￥ {refExpensesMoney.value.toFixed(2)}</span>
          </li>
          <li class={s.netIncome}>
            <span>净收入</span>
            <span>￥ {(refIncomeMoney.value - refExpensesMoney.value).toFixed(2)}</span>
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