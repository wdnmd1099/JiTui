import { defineComponent, onBeforeMount, onMounted, PropType, ref, Transition } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const refKind = ref('支出')
    onBeforeMount(async () => {
      const response: any = await http.get('/tags', {
        // _mock:'tagIndex',
        kind: 'expenses',
        page: 1
      })
      const response1: any = await http.get('/tags', {
        // _mock:'tagIndex',
        kind: 'income',
      })
      refExpensesTags.value = response.data.resources
      refIncomeTags.value = response1.data.resources

      if(response.data.pager.count < 25){ // 一进来请求就看标签是否满足25个，不满足25个直接显示没有更多
        refLoadMoreMessage.value[0].yesOrNo = false
      }else if(response1.data.pager.count < 25){
        refLoadMoreMessage.value[1].yesOrNo = false
      }
    })
    const refExpensesTags = ref<any>() // 支出标签
    const refIncomeTags = ref() //收入标签

    const refLoadMoreMessage = ref<any>([   //加载更多表驱动
      {name:'支出', yesOrNo:true, page:1},
      {name:'收入', yesOrNo:true, page:1},
    ])

    const ButtonOnLoad = (refValue: number, response: any) => {
      if (refValue !== 0 && refValue === 25) { //点击加载更多，下一页图标为25个的直接渲染
        response.data.resources.map((item: any) => { return refExpensesTags.value.push(item) })
      } else if(refValue !== 0 && refValue < 25){ //下一页标签大于0小于25的渲染后显示没有更多
         response.data.resources.map((item: any) => { return refExpensesTags.value.push(item) })
         refLoadMoreMessage.value.map((item: { name: any; yesOrNo:any })=>{
         if(refKind.value === item.name){
            item.yesOrNo = false
         }
        })
      }
    }

    const onLoadMore = async () => {  // 加载更多标签的点击事件
      if (refKind.value === '支出') { 
        const response: any = await http.get('/tags', {
          // _mock:'tagIndex', //假数据
          kind: 'expenses',
          page: refLoadMoreMessage.value[0].page += 1
        })
        ButtonOnLoad(response.data.pager.count, response)
      } else if (refKind.value === '收入') {
        const response: any = await http.get('/tags', {
          // _mock:'tagIndex', //假数据
          kind: 'income',
          page: refLoadMoreMessage.value[1].page += 1
        })
        ButtonOnLoad(response.data.pager.count, response) // response.data.pager.count 是此页的标签数量
      } 
    };

    const router = useRouter()
    return () => (
      <MainLayout>{
        {
          title: () => '记一笔',
          icon: () => <Icon name='left' class={s.navIcon} onClick={() => {
            router.push('/start')
          }}></Icon>,
          default: () => <>
            {/*下面是loading界面*/}
            <div class={refIncomeTags.value ? s.loadingCompleted : s.loading}>
              <div class={s.loaderWrapper}>
                <div class={s.loader} />
                <div class={s.loaderText}>{refExpensesTags.value ? '' : '加载中...'}</div>
              </div>
            </div>



            <div class={s.wrapper}>
              {/* <Tabs selected={refKind.value}  onUpdateSelected={(name:string) => refKind.value = name}> */}
              {/* 上下都能用，但是也要改Tabs.tsx的 */}
              <Tabs v-model:selected={refKind.value} class={s.tabs}>
                {/* 这里只传值就可以用v-model,如果要执行函数的话就用下面的 形参a 是组件返回的新值，把它传给refKind.value就实现双向绑定了 */}
                {/* selected={refKind.value} onUpdate:selected={(a)=>{refKind.value = a}}*/}
                <Tab name="支出" class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag} />
                    </div>
                    <div class={s.name}>
                      新增
                    </div>
                  </div>
                  {refExpensesTags.value?.map((tag: { sign: any; name: any; }) =>
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}
                  <div class={s.loadMoreTagsWrapper}>
                    {refLoadMoreMessage.value[0].yesOrNo === true ?
                      <Button onClick={onLoadMore} class={s.loadMoreTags}>点击加载更多</Button> :
                      <div class={s.noMoreTags}>没有更多</div>}
                  </div>
                </Tab>
                <Tab name="收入" class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag} />
                    </div>
                    <div class={s.name}>
                      新增
                    </div>
                  </div>
                  {refIncomeTags.value.map((tag: { sign: any; name: any; }) =>
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}
                  <div class={s.loadMoreTagsWrapper}>
                    {refLoadMoreMessage.value[1].yesOrNo === true ?
                      <Button onClick={onLoadMore} class={s.loadMoreTags}>点击加载更多</Button> :
                      <div class={s.noMoreTags}>没有更多</div>}
                  </div>
                </Tab>
              </Tabs>

              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </div>
          </>
        }}</MainLayout>
    )
  }
})