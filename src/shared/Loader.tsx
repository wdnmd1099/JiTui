import { defineComponent, PropType, ref } from "vue";
import s from './Loader.module.scss';
export const loaderSwitch = ref(true)
export const Loader = defineComponent({
  setup(props,context){
    return ()=>(
    <>
        <div class={loaderSwitch.value === true ?  s.loading: s.loadingCompleted}>
          <div class={s.loaderWrapper}>
            <div class={s.loader}/>
            <div class={s.loaderText}>{ loaderSwitch.value === true? '加载中...' : '' }</div>
          </div>
        </div>
    </>
    )
  }
})