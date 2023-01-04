import { Popup, DatetimePicker, Toast } from "vant";
import { defineComponent, PropType, reactive, ref, watch } from "vue";
import s from './TimeSelected.module.scss';
import { Time } from "./time";

export let diyStartDate = ref('')
export let diyEndDate = ref('')
export const TimeSelected = defineComponent({
    props: {
        refOn: {
            type: Boolean as PropType<boolean>
        },
        refSelected: {  // 必传一个当前选中的导航栏的name，如果是"自定义时间"，就触发watch
            type: String as PropType<string>,
            required: true,
        }
    },
    emits: ['update:refOn'],
    setup(props, context) {
        const refCancel = ref(false)
        const refDate = reactive({ start: new Date(), startBoolean: false, end: new Date(), endBoolean: false, })
        const showStartDatePicker = () => refDate.startBoolean = true
        const showEndDatePicker = () => refDate.endBoolean = true
        const hideStartDatePicker = () => { refDate.startBoolean = false }
        const hideEndDatePicker = () => { refDate.endBoolean = false }
        const setStart = (date: Date) => { refDate.start = date; hideStartDatePicker(); }
        const setEnd = (date: Date) => { refDate.end = date; hideEndDatePicker(); }

        watch(() => [props.refSelected], () => { //解决离开自定义时间后再点击自定义时间而不显示选择时间的选择框
            props.refSelected === '自定义时间' ? '' : refCancel.value = false
        })

        return () => (<>
            <div class={[s.clickShow]} onClick={() => {
                refCancel.value = false
            }}>
            </div>
            <div class={[s.timeSelected, [refCancel.value === true ? s.displayNone : '']]}>
                <div class={[s.hiddenShadow]}>
                    <div class={[s.shadow, , [refCancel.value === true ? s.displayNone : '']]}></div>
                </div>
                <div class={[s.wrapper, [refCancel.value === true ? s.displayNone : '']]}>
                    <div class={s.insideWrapper}>
                        <div class={s.selectTime}>
                            <header class={s.time}>请选择时间</header>
                        </div>
                        <div class={s.start}>
                            <div>开始时间</div>
                            <input readonly={true} class={s.startInput}
                                value={new Time(refDate.start).format()}
                                onClick={showStartDatePicker} />
                            <Popup position='bottom' v-model:show={refDate.startBoolean} >
                                <DatetimePicker value={refDate.start} type="date" title="选择年月日"
                                    onConfirm={setStart} onCancel={hideStartDatePicker}
                                    minDate={new Date(2022, 10, 1)}
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
                                onClick={() => {
                                    // console.log(refCancel.value)
                                    refCancel.value = true
                                }}
                            >取消</button>
                            <button class={s.confirm}
                                onClick={() => {
                                    refCancel.value = true
                                    const StartYear = Number(new Date(refDate.start).getFullYear())
                                    const StartMonth = Number(new Date(refDate.start).getMonth() + 1)
                                    const StartDay = Number(new Date(refDate.start).getDate())
                                    const EndYear = Number(new Date(refDate.end).getFullYear())
                                    const EndMonth = Number(new Date(refDate.end).getMonth() + 1)
                                    const EndDay = Number(new Date(refDate.end).getDate())
                                    if (StartYear > EndYear) {
                                        Toast('时间选择错误')
                                    } else if (StartYear === EndYear && StartMonth > EndMonth) {
                                        Toast('时间选择错误')
                                    } else if (StartYear === EndYear && StartMonth === EndMonth) {
                                        if (StartDay > EndDay) {
                                            Toast('时间选择错误')
                                        }
                                    }
                                    diyStartDate.value = `${StartYear}-${StartMonth}-${StartDay}`
                                    diyEndDate.value = `${EndYear}-${EndMonth}-${EndDay}`
                                    console.log(diyStartDate.value,diyEndDate.value)
                                }}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )



    }
})