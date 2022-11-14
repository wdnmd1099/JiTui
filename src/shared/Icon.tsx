import { defineComponent, PropType, ref } from "vue";
import s from './Icon.module.scss';
export const Icon = defineComponent({
  props:{
    name:{
      type:String as PropType <'add'| 'chart' | 'clock' | 'cloud' |'jitui' | 'pig'>
    }
  },
  setup(props,context){
    return ()=>(
        <svg class={s.icon}>
            <use xlinkHref={'#'+ props.name}></use>
        </svg>
    )
  }
})