import { defineComponent, PropType, ref } from "vue";
import s from './Button.module.scss'
export const Button = defineComponent({
    props:{
        onClick:{
            type: Function as PropType<(e:MouseEvent) => void>
        },
        level:{
            type: String as PropType<'important' | 'normal' | 'danger'>,
            default:'important',
        },
    },
    setup(props, context) {
        return () => (
            <button class={[s.button , s[props.level] ]} onClick={props.onClick}>
                {context.slots?.default?.()}
            </button>
        )
    }
})

