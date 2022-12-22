import { defineComponent, PropType, ref } from "vue";
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
        {props.refData?.map((item: {
            kind: any;tags: any; created_at: any; id: any; amount: any;
        }) =>{ 
          const time = item.created_at.match(/^.{10}/gm)[0]
           + " "+ item.created_at.match(/.{2}:.{2}:.{2}/gm)[0];
          //  console.log(item)
        return(
          <div class={s.wrapper} onClick={() => { console.log(props.startDate, props.endDate) }}>
            <div class={s.emoji}>{item.tags[0].sign}</div>
            <span class={s.id}>
              {item.tags[0].name}
            </span>
            <span class={s.time}>{time}</span>
            <span class={[s.money,[item.kind==='expenses'?'':s.IncomeMoney]]}>￥ {item.amount/100}</span>
          </div>
        )}
        )
        }
        <div>{context.slots?.default?.()}</div>
      </div>
    </>
    )
  }
})