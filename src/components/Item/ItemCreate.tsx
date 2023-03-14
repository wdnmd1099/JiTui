import { defineComponent, onBeforeMount, PropType, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { LoadMoreButton } from "../../shared/LoadMoreButton";
import { Overlay } from "../../shared/Overlay";
import { Tab, Tabs } from "../../shared/Tabs";
import { refLoadMoreMessage, onLoadMore } from "../../shared/TagsLoadMore";
import { InputPad } from "./InputPad";
import s from './ItemCreate.module.scss';



export const refKind = ref('支出') // 现在所在的页面
export const refExpensesTags = ref<any>([]) // 支出标签
export const refIncomeTags = ref([]) //收入标签
export const itemSelected = ref({ name: '', sign: '', id: 0, amount: 0 }) //当前选中的标签 , id是每个表情都有的随机数字
export let refTagData = reactive({tagName:'',tagSign:'',tagId:0})
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const router = useRouter()
    const createTag = '/tags/create'
    const overlayVisible = ref(false)
    const onClickMenu = ()=>{
      overlayVisible.value = !overlayVisible.value;
  }


    onBeforeMount(async () => {
      const response: any = await http.get('/tags', {
        // _mock:'tagIndex',
        kind: 'expenses',
      })
      const response1: any = await http.get('/tags', {
        // _mock:'tagIndex',
        kind: 'income',
      })
      refExpensesTags.value = response.data.resources
      refIncomeTags.value = response1.data.resources

      if (response.data.pager.count < 25) { // 一进来请求就看标签是否满足25个，不满足25个直接显示没有更多
        refLoadMoreMessage.value[0].yesOrNo = false
      } 
      if (response1.data.pager.count < 25) {
        refLoadMoreMessage.value[1].yesOrNo = false
      }
    })

    let timer:undefined | number = undefined
    let screenX = 0
    let screenY = 0
    const onTouchend = (e:TouchEvent)=>{
      clearTimeout(timer)
    }
    const onTouchmove = (e:TouchEvent)=>{
      if(e.touches[0].screenX - screenX > 20 || e.touches[0].screenX - screenX<20
        || e.touches[0].screenY - screenY > 20 || e.touches[0].screenY - screenY < 20){
        clearTimeout(timer)
      }
    } 

    return () => (
      <MainLayout>{
        {
          title: () => '记一笔',
          icon: () => <Icon name='menu' class={s.navIcon} onClick={onClickMenu} />,
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
                      <Icon name="add" class={s.createTag} onClick={() => { router.push(createTag)}} />
                    </div>
                    <div class={s.name}>
                      新增
                    </div>
                  </div>
                  {refExpensesTags.value?.map((tag: { sign: any; name: any; id: any }) =>
                    <div class={[s.tag, [itemSelected.value.id === tag.id ? s.selected : '']]}
                      onClick={() => {
                        itemSelected.value.name = tag.name;
                        itemSelected.value.sign = tag.sign;
                        itemSelected.value.id = tag.id;
                      }}>
                      <div class={s.sign}
                      onTouchstart = { (e:TouchEvent)=>{
                        screenX = e.touches[0].screenX
                        screenY = e.touches[0].screenY
                        timer = setTimeout(() => {
                         refTagData.tagName = tag.name
                         refTagData.tagSign = tag.sign
                         refTagData.tagId = tag.id
                         router.push('/tags/1/edit')
                        }, 700);
                      } }
                      onTouchend  =  { onTouchend }
                      onTouchmove =  { onTouchmove}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}
                  <LoadMoreButton yesOrNo={refLoadMoreMessage.value[0].yesOrNo}
                    onClick={onLoadMore} />
                  {/* <div class={s.loadMoreTagsWrapper}>
                    {refLoadMoreMessage.value[0].yesOrNo === true ?
                      <Button onClick={onLoadMore} class={s.loadMoreTags}>点击加载更多</Button> :
                      <div class={s.noMoreTags}>没有更多</div>}
                  </div> */}
                </Tab>
                <Tab name="收入" class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag} onClick={() => { router.push(createTag)}} />
                    </div>
                    <div class={s.name} >
                      新增
                    </div>
                  </div>
                  {refIncomeTags.value.map((tag: { sign: any; name: any; id: any }) =>
                    <div class={[s.tag, [itemSelected.value.id === tag.id ? s.selected : '']]}
                      onClick={() => {
                        itemSelected.value.name = tag.name;
                        itemSelected.value.sign = tag.sign;
                        itemSelected.value.id = tag.id;
                      }}>
                      <div class={s.sign}
                      onTouchstart = { (e:TouchEvent)=>{
                        screenX = e.touches[0].screenX
                        screenY = e.touches[0].screenY
                        timer = setTimeout(() => {
                         refTagData.tagName = tag.name
                         refTagData.tagSign = tag.sign
                         refTagData.tagId = tag.id
                         router.push('/tags/1/edit')
                        }, 700);
                      } }
                      onTouchend  =  { onTouchend }
                      onTouchmove =  { onTouchmove}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}
                  <LoadMoreButton yesOrNo={refLoadMoreMessage.value[1].yesOrNo}
                    onClick={onLoadMore} />
                </Tab>
              </Tabs>

              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </div>
            {overlayVisible.value && <Overlay onClose={() => overlayVisible.value = false} />}
          </>
        }}</MainLayout>
    )
  }
})