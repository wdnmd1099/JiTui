import { defineComponent, onBeforeMount, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Overlay } from "../../shared/Overlay";
import { Tab, Tabs } from "../../shared/Tabs";
import { TimeSelected } from "../../shared/TimeSelected";
import { time } from "../../shared/time";
import s from './ItemList.module.scss';
import { ItemSummary } from "./ItemSummary";
import { http } from "../../shared/Http";

export let refExpensesMoney = ref(0);
export let refIncomeMoney = ref(0);
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    onBeforeMount(async()=>{
        const response:any =  await http.get('items',{page:2})
        refData.value = response.data.resources
        console.log(response.data.resources)
        if(refData.value){
          refData.value.map((item: any)=>{
            if(item.kind === "expenses"){
              refExpensesMoney.value += item.amount
            }else if(item.kind === "income"){
              refIncomeMoney.value += item.amount
            }
          })
          refIncomeMoney.value=refIncomeMoney.value/100
        }
    })



    const refSelected = ref('本月')
    const refData = ref()
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
                  <ItemSummary startDate={time[0].startDay} endDate={time[0].endDay} refData={refData.value}/>
                </Tab>

                <Tab name='上月'>
                  <ItemSummary startDate={time[1].startDay} endDate={time[1].endDay} refData={refData.value}/>
                </Tab>

                <Tab name='今年'>
                  <ItemSummary startDate={time[2].startDay} endDate={time[2].endDay} refData={refData.value}/>
                </Tab>

                <Tab name='自定义时间'>
                  <ItemSummary startDate={time[2].startDay} endDate={time[2].endDay} refData={refData.value} />
                  <TimeSelected/>
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

