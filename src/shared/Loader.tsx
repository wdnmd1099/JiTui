import { defineComponent, PropType, ref } from "vue";
import s from './Loader.module.scss';
export const Loader = defineComponent({
  props:{
    loaderSwitch:{
        type:Boolean as PropType<boolean>
    }
  },
  setup(props,context){
    return ()=>(
    <>
        <div class={props.loaderSwitch === true ? s.loadingCompleted : s.loading}>
          <div class={s.loaderWrapper}>
            <div class={s.loader}/>
            <div class={s.loaderText}>{ '加载中...' }</div>
          </div>
        </div>
    </>
    )
  }
})