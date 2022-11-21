import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { time } from "../../shared/time";
import s from './InputPad.module.scss';
import { DatetimePicker, Popup } from 'vant';
export const InputPad = defineComponent({
  props:{
    name:{
        type:String as PropType<string>
    }
  },
  setup(props,context){
    const buttons = [
      {text:'1',onclick:()=>{
        refAmount.value += '1'
      }},
      {text:'2',onclick:()=>{}},
      {text:'3',onclick:()=>{}},
      {text:'4',onclick:()=>{}},
      {text:'5',onclick:()=>{}},
      {text:'6',onclick:()=>{}},
      {text:'7',onclick:()=>{}},
      {text:'8',onclick:()=>{}},
      {text:'9',onclick:()=>{}},
      {text:'.',onclick:()=>{}},
      {text:'0',onclick:()=>{}},
      {text:'清空',onclick:()=>{}},
      {text:'提交',onclick:()=>{
        console.log((document.querySelector('.xxxx') as HTMLInputElement).innerText) 
      }
    },
    ]
    const refDate = ref<Date>()
    const refDatePickerVisible = ref(false)
    const showDatePicker = () => refDatePickerVisible.value = true
    const hideDatePicker = () => refDatePickerVisible.value = false
    const setDate = (date: Date) => {refDate.value = date; hideDatePicker() }
    const refAmount = ref()
    return ()=>(
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
             <Icon name='date' class={s.icon}/>
             
             <span  class='xxxx' onClick={showDatePicker}>{time(refDate.value).format()}</span>
             <Popup position='bottom' v-model:show={refDatePickerVisible.value} >
              <DatetimePicker value={refDate.value} type="date" title="选择年月日"
                onConfirm={setDate} onCancel={hideDatePicker} 
                minDate={new Date(2022, 10, 11)}
                maxDate={new Date(2025, 0, 1)}
                //onConfirm 这个API 会返回当前选中的时间，然后赋值给refDate 然后refDate传给time 就可以显示出来了
                //https://vant-ui.github.io/vant/#/zh-CN/datetime-picker#dai-ma-yan-shi
              />
            </Popup>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
        </div>

        <div class={s.buttons}>
          {buttons.map(button => 
          <button onClick={button.onclick}>{button.text}</button>)}
        </div>

      </>
    )
  }
})