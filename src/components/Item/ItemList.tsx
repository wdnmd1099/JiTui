import { defineComponent, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Overlay } from "../../shared/Overlay";
import { Tab, Tabs } from "../../shared/Tabs";
import { diyEndDate, diyStartDate, TimeSelected } from "../../shared/TimeSelected";
import { time } from "../../shared/time";
import s from './ItemList.module.scss';
import { ItemSummary } from "./ItemSummary";
import { AddButton } from "../../shared/AddButton";


export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const refSelected = ref('本月')
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
              <Tabs v-model:selected={refSelected.value}  class={s.tabs}>
                <Tab name='本月' >
                  <ItemSummary startDate={time[0].startDay} endDate={time[0].endDay} />
                </Tab>

                <Tab name='上月'>
                  <ItemSummary startDate={time[1].startDay} endDate={time[1].endDay} />
                </Tab>

                <Tab name='今年'>
                  <ItemSummary startDate={time[2].startDay} endDate={time[2].endDay} />
                </Tab>

                <Tab name='自定义时间'>
                  <ItemSummary startDate={diyStartDate.value} endDate={diyEndDate.value} />
                  <TimeSelected refSelected={refSelected.value}/>
                </Tab>
              </Tabs>

              {overlayVisible.value &&
                <Overlay onClose={() => overlayVisible.value = false} />}

              <AddButton></AddButton>
            </>
          )
        }
      }</MainLayout>
    </>
    )
  }
})

