import { defineComponent, PropType, reactive, ref } from "vue";
import { ItemData } from "../components/Item/ItemData";
import { MainLayout } from "../layouts/MainLayout";
import { Form } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { Overlay } from "../shared/Overlay";
import { Tab, Tabs } from "../shared/Tabs";
import { time, Time } from "../shared/time";
import { TimeSelected } from "../shared/TimeSelected";
import s from './StatisticsPage.module.scss';
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
    const refSelect = ref('1')
    return () => (<>
      <MainLayout>{
        {
          title: () => '鸡腿记账',
          icon: () => <Icon name='menu' onClick={onClickMenu} />,
          default: () => (
            <>
              <Tabs v-model:selected={refSelected.value} class={s.tabs}>
                <Tab name='本月'>
                  <Form v-model={refSelect.value} label='类型' type="select" options={[
                    { value: '1', text: '支出' },
                    { value: '2', text: '收入' },
                  ]}>
                  </Form>
                </Tab>

                <Tab name='上月'>
                  <Form v-model={refSelect.value} label='类型' type="select" options={[
                    { value: '1', text: '支出' },
                    { value: '2', text: '收入' },
                  ]}>
                  </Form>
                </Tab>

                <Tab name='今年'>
                <Form v-model={refSelect.value} label='类型' type="select" options={[
                    { value: '1', text: '支出' },
                    { value: '2', text: '收入' },
                  ]}>
                  </Form>
                </Tab>

                <Tab name='自定义时间'>
                  <TimeSelected />
                  <Form v-model={refSelect.value} label='类型' type="select" options={[
                    { value: '1', text: '支出' },
                    { value: '2', text: '收入' },
                  ]}>
                  </Form>
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

