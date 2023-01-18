import { defineComponent, PropType, ref } from "vue";
import { useRouter } from "vue-router";
import { Button } from "./Button";
import { Icon } from "./Icon";
import s from './QRcodeLoad.module.scss';
export const QRcodeLoad = defineComponent({
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
          <Icon name='QRcode200px' class={s.QRcode}></Icon>
          <div class={s.tips}>手机扫码效果更佳</div>
          <Button class={s.back} onClick={()=>{onClickMenu()}}>返回</Button>
      </div>
    </>
      
    )
  }
})