import { defineComponent, PropType, ref } from "vue";
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
  props:{
    startDate:{ //开始日期
        type:String as PropType<string>
    },
    endDate:{ // 结束日期
      type:String as PropType<string>
  },
    refData:{
      type:Array as PropType<any>
    },
  },
  setup(props,context){
    
    return ()=>(
    <div class={s.outsideWrapper}>
      <div class={s.hiddenDiv}></div>
        <div class={s.total}>
          <li class={s.income}>
            <span>收入</span>
            <span>￥ 0.00</span>
          </li>
          <li class={s.expenditure}>
            <span>支出</span>
            <span>￥ 0.00</span>
          </li>
          <li class={s.netIncome}>
            <span>净收入</span>
            <span>￥ 0.00</span>
          </li>
        </div>
        {props.refData?.map((item: {
            time: any; id: any; money:any;
            }) => 
            ( 
              <div class={s.wrapper} onClick={()=>{console.log(props.startDate,props.endDate)}}>
                <div class={s.emoji}>￥</div>
                <span class={s.id}>
                  {item.id}
                  </span>
                <span class={s.time}>{item.time}</span>
               
                <span class={s.money}>￥ {item.money}</span>
              </div>
            ) 
          )
        }
      </div>
    )
  }
})