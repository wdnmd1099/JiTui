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
    const refAmount = ref('0')
    const appendText = (_n:number|string)=>{
        const n=_n.toString()
        const dotIndex =refAmount.value.indexOf('.')
        let add = ()=>{refAmount.value += n}
        if(n ==='.' && dotIndex === -1){ //一开始打. 就是0.
          add()
          return
        }else if(refAmount.value[0]==='0' && dotIndex === -1){ //一开始打数字，就是数字
          refAmount.value = ''
          add()
          return
        }else if(n ==='.' && dotIndex >= 0){ //打了点不能再打点
          return
        }
        else if(refAmount.value.length > 11 ){
          return
        }
        else if(refAmount.value.length - dotIndex > 2 && dotIndex !== -1){ //小数点后二位结束
          return
        }
        
        add()
    }
    const buttons = [
      {text:'1',onclick:()=>{appendText(1)}},
      {text:'2',onclick:()=>{appendText(2)}},
      {text:'3',onclick:()=>{appendText(3)}},
      {text:'4',onclick:()=>{appendText(4)}},
      {text:'5',onclick:()=>{appendText(5)}},
      {text:'6',onclick:()=>{appendText(6)}},
      {text:'7',onclick:()=>{appendText(7)}},
      {text:'8',onclick:()=>{appendText(8)}},
      {text:'9',onclick:()=>{appendText(9)}},
      {text:'.',onclick:()=>{appendText('.')}},
      {text:'0',onclick:()=>{appendText(0)}},
      {text:'清空',onclick:()=>{refAmount.value = '0'}},
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

function appendText(arg0: number) {
  throw new Error("Function not implemented.");
}
