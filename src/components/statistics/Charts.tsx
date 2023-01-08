import { defineComponent, PropType, ref, watch } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Form } from "../../shared/Form";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { Time, time } from "../../shared/time";
import { diyEndDate, diyStartDate, TimeSelected } from "../../shared/TimeSelected";
import s from './Charts.module.scss';
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { Bars } from "./Bars";
import { Overlay } from "../../shared/Overlay";
export const StatisticsPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const refSelected = ref('本月')
    time;
    const overlayVisible = ref(false)
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value;
    }


    return () => (<>
      <MainLayout>{
        {
          title: () => '鸡腿记账',
          icon: () => <Icon name='menu' onClick={onClickMenu} />,
          default: () => (
            <>
              <Tabs resetSelectInput={true} v-model:selected={refSelected.value} class={s.tabs} rerenderOnSelected={true}>
                <Tab name='本月'>
                  <Form label='类型' type="select" options={[
                    { value: 'expenses', text: '支出' },
                    { value: 'income', text: '收入' },
                  ]}>
                  </Form>
                  <LineChart startDate={time[0].startDay} endDate={time[0].endDay} />
                  <PieChart startDate={time[0].startDay} endDate={time[0].endDay}/>
                  <Bars startDate={time[0].startDay} endDate={time[0].endDay}/>
                </Tab>

                <Tab name='上月'>
                  <Form label='类型' type="select" options={[
                    { value: 'expenses', text: '支出' },
                    { value: 'income', text: '收入' },
                  ]}>
                  </Form>
                  <LineChart startDate={time[1].startDay} endDate={time[1].endDay} />
                  <PieChart startDate={time[1].startDay} endDate={time[1].endDay}/>
                  <Bars startDate={time[1].startDay} endDate={time[1].endDay}/>
                </Tab>

                <Tab name='三个月'>
                  <Form label='类型' type="select" options={[
                    { value: 'expenses', text: '支出' },
                    { value: 'income', text: '收入' },
                  ]}>
                  </Form>
                  <LineChart startDate={time[3].startDay} endDate={time[3].endDay} />
                  <PieChart startDate={time[3].startDay} endDate={time[3].endDay}/>
                  <Bars startDate={time[3].startDay} endDate={time[3].endDay}/>
                </Tab>

                <Tab name='自定义时间'>
                  <TimeSelected twoMonth={true} refSelected={refSelected.value} />
                  {diyStartDate.value && diyEndDate.value ? <div class={s.rerender}>
                    <Form label='类型' type="select" options={[
                      { value: 'expenses', text: '支出' },
                      { value: 'income', text: '收入' },
                    ]}>
                    </Form>
                    <LineChart startDate={diyStartDate.value} endDate={diyEndDate.value} />
                    <PieChart startDate={diyStartDate.value} endDate={diyEndDate.value}/>
                    <Bars startDate={diyStartDate.value} endDate={diyEndDate.value}/>
                    </div> : ''
                    }
                </Tab>
              </Tabs>

              {overlayVisible.value &&
                <Overlay onClose={() => overlayVisible.value = false} />}
            </>
          )
        }
      }</MainLayout>
    </>
    )
  }
})

