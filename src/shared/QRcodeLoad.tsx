import { defineComponent, PropType, ref } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "./Button";
import { Icon } from "./Icon";
import s from './Notify.module.scss';
import { Overlay } from "./Overlay";
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
      <img class={s.QRcode} src="./src/assets/icons/体验账号200px.png"  />
          <div class={s.nodata}>手机扫码效果更佳</div>
          <Button class={s.back} onClick={()=>{onClickMenu()}}>返回</Button>
      </div>
    </>
      
    )
  }
})