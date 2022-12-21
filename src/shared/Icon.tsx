import { defineComponent, PropType, ref } from "vue";
import s from './Icon.module.scss';

//用法：把svg放到src/assets/icons 把svg名字写到下面，重启服务器就可以了
export type IconName = 'add' | 'chart' | 'clock' | 'cloud' | 'jitui' | 'pig' | 'menu'
| 'charts' | 'notify' | 'export' | 'left' | 'date' | 'books'
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    },
    onClick:{
      type: Function as PropType<(e: MouseEvent) => void>
    },
  },
  setup(props, context) {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={'#' + props.name} ></use>
      </svg>
    )
  }
})