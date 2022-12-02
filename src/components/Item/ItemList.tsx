import { defineComponent, PropType, reactive, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Overlay } from "../../shared/Overlay";
import { Tab, Tabs } from "../../shared/Tabs";
import { Test } from "../../shared/Test";
import { Time } from "../../shared/time";
import s from './ItemList.module.scss';
import { ItemSummary } from "./ItemSummary";
export const ItemList = defineComponent({
  props:{
    name:{
        type:String as PropType<string>
    }
  },
  setup(props,context){
    const refSelected = ref('本月')
    const refDate = ref<Date>()
    const time = reactive([
      {startDay:new Time().firstDayOfMonth().format(),  //本月
        endDay:new Time().lastDayOfMonth().format()},
      {startDay:new Time().add(-1,'month').firstDayOfMonth().format(), // 上月
        endDay:new Time().add(-1,'month').lastDayOfMonth().format()},
      {startDay:new Time().firstDayOfYear().format(),  //今年
        endDay:new Time().lastDayOfYear().format()},
    ])
    const refData = ref([
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
    const refData1 = ref([
      {id:'吃饭',time:'2022-11-23',money:'325'},
      {id:'睡觉',time:'2022-11-23',money:'722'},
      {id:'打游戏',time:'2022-11-23',money:'1'},])
    const overlayVisible = ref(false)
    const onClickMenu = ()=>{
      overlayVisible.value = !overlayVisible.value;
    }
    return ()=>(<>
     <MainLayout>{
      {
        title: ()=>'鸡腿记账',
        icon:()=> <Icon name='menu' onClick={onClickMenu}/>,
        default:()=>(
          <>
            <Tabs v-model:selected={refSelected.value} class={s.tabs}>
              <Tab name='本月' >
                <ItemSummary startDate={time[0].startDay} endDate={time[0].endDay} refData={refData.value}>
                
                </ItemSummary>
              </Tab>
              <Tab name='上月'>
              <ItemSummary startDate={time[1].startDay} endDate={time[1].endDay} refData={refData1.value}>

              </ItemSummary>
              </Tab>
              <Tab name='今年'>
              <ItemSummary startDate={time[2].startDay} endDate={time[2].endDay} refData={refData1.value}>

              </ItemSummary>
              </Tab>
              <Tab name='自定义时间'>
              <ItemSummary startDate={time[2].startDay} endDate={time[2].endDay} refData={refData.value} />
                <Test/>
              

                  
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

