import { Popup, DatetimePicker } from "vant";
import { defineComponent, reactive, ref } from "vue";
import { ItemSummary } from "../components/Item/ItemSummary";
import { Time } from "./time";
import s from './TimeSelect.module.scss';
export const TimeSelect = defineComponent({
    setup(props, context) {
        const refDate = reactive({ start: new Date(), startBoolean: false, end: new Date(), endBoolean: false, })
        const showStartDatePicker = () => refDate.startBoolean = true
        const showEndDatePicker = () => refDate.endBoolean = true
        const hideStartDatePicker = () => { refDate.startBoolean = false }
        const hideEndDatePicker = () => { refDate.endBoolean = false }
        const setStart = (date: Date) => { refDate.start = date; hideStartDatePicker();}
        const setEnd = (date: Date) => { refDate.end = date;hideEndDatePicker();}
        const refChange = ref(false);
        const refDataX = ref([
            {id:'旅行',time:'2022-11-23',money:'9999'},
            {id:'旅行',time:'2022-11-23',money:'9999'},
            {id:'旅行',time:'2022-11-23',money:'3'},
            {id:'旅行',time:'2022-11-23',money:'33'},
            {id:'旅行',time:'2022-11-23',money:'545'},
            {id:'旅行',time:'2022-11-23',money:'555'},
            {id:'旅行',time:'2022-11-23',money:'325'},
            {id:'旅行',time:'2022-11-23',money:'722'},
            {id:'旅行',time:'2022-11-23',money:'1'},
            {id:'旅行',time:'2022-11-23',money:'3'},
            {id:'旅行',time:'2022-11-23',money:'2632'},
          ])
          const refItemSummary = ref(<ItemSummary  refData={refDataX.value} />)
          const refItemSummaryChange = ref(false)

        
        return () => (<>
            <div class={s.tool} onClick={()=>( refItemSummaryChange.value=false,refChange.value = false)}></div>
            <div class={[s.wrapper,[refChange.value===true? s.hiddenWindow : '']]} v-model={refChange.value}>
                <div class={s.shadow}></div>
                <div class={s.upProps}>
                    <header class={s.title}>请选择时间</header>
                    <div class={s.start}>开始时间
                        <input type="text" class={s.startInput} readonly={true}
                            value={new Time(refDate.start).format()}
                            onClick={showStartDatePicker} />
                        <Popup position='bottom' v-model:show={refDate.startBoolean} >
                            <DatetimePicker value={refDate.start} type="date" title="选择年月日"
                                onConfirm={setStart} onCancel={hideStartDatePicker}
                                minDate={new Date(2022, 10, 11)}
                                maxDate={new Date(2025, 0, 1)}
                            />
                        </Popup>
                    </div>
                    <div class={s.end}>结束时间
                        <input type="text" class={s.endInput} readonly={true}
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
                        <span class={s.no}  
                        onClick={()=>{
                                    refChange.value = true
                                    refItemSummaryChange.value = true;
                                 }
                        }>取消</span>
                        <span class={s.yes}
                        onClick={()=>{
                            refChange.value = true;
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
                            
                        }}>确定</span>
                    </div>
                </div>
            </div>
            <div class={[[refItemSummaryChange.value===false?s.IS : '']]}>{refItemSummary.value}</div>
            </>
        )
    }
})