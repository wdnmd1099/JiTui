import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { FunctionalComponent, ref } from 'vue';
import { SkipFeatures } from '../../shared/SkipFeatures';
import { Overlay } from 'vant';
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon'
const refShowQRcodeOverlay = ref<boolean>(true)
export const FirstActions: FunctionalComponent = () => {
  return <div class={s.actions}>
    <SkipFeatures class={s.fake} to="/start" />
    <RouterLink to="/welcome/2" >下一页</RouterLink>
    <SkipFeatures />
    <Overlay show={refShowQRcodeOverlay.value}  class={s.QRcodeOverlay}>
        <Icon class={s.QRcode} name = "QRcode200px"  />
        <div class={s.tips}>手机扫码效果更佳</div>
        <Button class={s.QRcodeButton} onClick={()=>{
              refShowQRcodeOverlay.value = false
           }}>关闭
        </Button>
    </Overlay>
  </div>
}

FirstActions.displayName = 'FirstActions'
