import { Popup, DatetimePicker } from "vant";
import { defineComponent, PropType, reactive, ref } from "vue";
import { ItemSummary } from "../components/Item/ItemSummary";
import s from './Test.module.scss';
import { Time } from "./time";
export const Test = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const refCancel = ref(false)
        const refDate = reactive({ start: new Date(), startBoolean: false, end: new Date(), endBoolean: false, })
        const showStartDatePicker = () => refDate.startBoolean = true
        const showEndDatePicker = () => refDate.endBoolean = true
        const hideStartDatePicker = () => { refDate.startBoolean = false }
        const hideEndDatePicker = () => { refDate.endBoolean = false }
        const setStart = (date: Date) => { refDate.start = date; hideStartDatePicker();}
        const setEnd = (date: Date) => { refDate.end = date;hideEndDatePicker();}
        const refDataX = ref([
            {id:'旅行',time:'2022-11-23',money:'9999'},
          ])
          const refItemSummary = ref(<ItemSummary  refData={refDataX.value} />)
          const refItemSummaryChange = ref(false)
        return () => (<div class={s.sss}>
        <div class={[s.hiddenShadow]}>
                <div class={[s.shadow,,[refCancel.value === true ? s.displayNone : '']]}></div>
            </div>
            <div class={[s.wrapper,[refCancel.value === true ? s.displayNone : '']]}>
                <div class={s.insideWrapper}>
                    <div class={s.selectTime}>
                        <header class={s.time}>请选择时间</header>
                    </div>
                    <div class={s.start}>
                        <div>开始时间</div>
                        <input readonly={true} class={s.startInput} 
                        value={new Time(refDate.start).format()}
                            onClick={showStartDatePicker}/>
                        <Popup position='bottom' v-model:show={refDate.startBoolean} >
                            <DatetimePicker value={refDate.start} type="date" title="选择年月日"
                                onConfirm={setStart} onCancel={hideStartDatePicker}
                                minDate={new Date(2022, 10, 11)}
                                maxDate={new Date(2025, 0, 1)}
                            />
                        </Popup>
                    </div>
                    <div class={s.end}>
                        <div>结束时间</div>
                        <input readonly={true} class={s.endInput} 
                         value={new Time(refDate.end).format()}
                         onClick={showEndDatePicker} />
                         <Popup position='bottom' v-model:show={refDate.endBoolean} >
                            <DatetimePicker value={refDate.end} type="date" title="选择年月日"
                                onConfirm={setEnd} onCancel={hideEndDatePicker}
                                minDate={new Date(2022, 10, 11)}
                                maxDate={new Date(2025, 0, 1)}
                            />
                        </Popup>
                    </div>

                    <div class={s.yesOrNo}>
                        <button class={[s.cancel]}
                        onClick={()=>{
                            refCancel.value = true
                        }}
                        >取消</button>
                        <button class={s.confirm}
                        onClick={()=>{
                            refCancel.value = true
                            refItemSummaryChange.value = true;
                            refItemSummary.value=<ItemSummary  refData={refDataX.value} />;
                            const StartYear = new Date(refDate.start).getFullYear()
                            const StartMonth = new Date(refDate.start).getMonth()
                            const StartDay = new Date(refDate.start).getDate()
                            const EndYear = new Date(refDate.end).getFullYear()
                            const EndMonth = new Date(refDate.end).getMonth()
                            const EndDay = new Date(refDate.end).getDate()
                            Number(StartYear)
                            Number(StartMonth)
                            Number(StartDay)
                            Number(EndYear)
                            Number(EndMonth)
                            Number(EndDay)
                            console.log(StartYear,EndYear,StartMonth,EndMonth,StartDay,EndDay)
                            if(StartYear > EndYear){
                                console.log('cao')
                                alert('cao')
                            }else if(StartYear === EndYear && StartMonth > EndMonth){
                                console.log('cao')
                                alert('cao')
                            }else if(StartYear === EndYear && StartMonth === EndMonth){
                                if(StartDay > EndDay){
                                    console.log('cao')  
                                   alert('cao')
                                }
                            }
                            
                        }}>确定</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
})