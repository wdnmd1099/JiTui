import { defineComponent, PropType, ref } from "vue";
import { Icon } from "./Icon";
import s from './TitleAndLogo.module.scss';
export const TitleAndLogo = defineComponent({
  props:{
    title:{
        type:String as PropType<string>
    }
  },
  setup(props,context){
    return ()=>(
        <div class={s.jitui_wrapper}>
        <Icon name='jitui' class={s.logo}></Icon>
        <div class={s.title}>{props.title}</div>
        </div>
    )
  }
})