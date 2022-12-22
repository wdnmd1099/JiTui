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
import { LoadMoreButton } from "../../shared/LoadMoreButton";

export let refExpensesMoney = ref(0);
export let refIncomeMoney = ref(0);
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const refSelected = ref('本月')
    const refData = ref<any>([])
    const overlayVisible = ref(false)
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value;
    }

    const refPageNumber = ref(1)
    onBeforeMount(async()=>{
        let response:any =  await http.get('items',{page:refPageNumber.value})  
        response.data.resources.map((item: any)=>{ 
          refData.value.push(item)
        })
        for(let i = refPageNumber.value; i <= 99999; i++){  // i给个很高的值，一直遍历
          if(response.data.pager.count != 0 &&response.data.pager.count <= 25){ //如果此页有25个账单，就继续请求下一页，因为服务器要求一页就是25个账单
              refPageNumber.value += 1
              response =  await http.get('items',{page:refPageNumber.value})
              response.data.resources.map((item: any)=>{
                refData.value.push(item)
              })
          }else if(response.data.pager.count === 0 ){ // 如果发现此页没有账单，就终止for循环
              break;
          }

        }
        console.log(refData.value)
        if(refData.value){
          refData.value.map((item: any)=>{
            if(item.kind === "expenses"){
              refExpensesMoney.value += item.amount
            }else if(item.kind === "income"){
              refIncomeMoney.value += item.amount
            }
          })
          refIncomeMoney.value =  refIncomeMoney.value/100;
          refExpensesMoney.value = refExpensesMoney.value/100;
          console.log()
        }
    })



  

  
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

