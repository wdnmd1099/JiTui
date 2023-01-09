import { defineComponent, PropType, ref } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "./Button";
import { Icon } from "./Icon";
import s from './Notify.module.scss';
import { Overlay } from "./Overlay";
export const Notify = defineComponent({
  props:{
    name:{
        type:String as PropType<string>
    }
  },
  setup(props,context){
    const router = useRouter()
    const onClickMenu = () => {
        router.push('/start')
    }
    return ()=>(<>
      <div class={s.wrapper}>
          <Icon name='commingSoon' class={s.commingSoon}></Icon>
          <div class={s.nodata}>敬请期待</div>
          <Button class={s.back} onClick={()=>{onClickMenu()}}>返回</Button>
      </div>
    </>
      
    )
  }
})