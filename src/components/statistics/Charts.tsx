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
                  <PieChart />
                  <Bars />
                </Tab>

                <Tab name='上月'>
                  <Form label='类型' type="select" options={[
                    { value: 'expenses', text: '支出' },
                    { value: 'income', text: '收入' },
                  ]}>
                  </Form>
                  <LineChart startDate={time[1].startDay} endDate={time[1].endDay} />
                  <PieChart />
                  <Bars />
                </Tab>

                <Tab name='今年'>
                  <Form label='类型' type="select" options={[
                    { value: 'expenses', text: '支出' },
                    { value: 'income', text: '收入' },
                  ]}>
                  </Form>
                  <LineChart startDate={time[2].startDay} endDate={time[2].endDay} />
                  <PieChart />
                  <Bars />
                </Tab>

                <Tab name='自定义时间'>
                  <TimeSelected refSelected={refSelected.value} />
                  {diyStartDate.value && diyEndDate.value ? <div class={s.rerender}>
                  {console.log('渲染',diyStartDate.value,diyEndDate.value)}
                    <Form label='类型' type="select" options={[
                      { value: 'expenses', text: '支出' },
                      { value: 'income', text: '收入' },
                    ]}>
                    </Form>
                    <LineChart startDate={diyStartDate.value} endDate={diyEndDate.value} />
                    <PieChart />
                    <Bars />
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

