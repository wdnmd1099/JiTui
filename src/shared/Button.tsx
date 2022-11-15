import { defineComponent, ref } from "vue";
import s from './Button.module.scss'

interface Props{
    onClick?:(e:MouseEvent) => void
}

export const Button = defineComponent<Props>({
    setup(props, context) {
        const test = ()=>{console.log(context.slots.default?.())}
        return () => (
            <button class={s.button} >
                {context.slots?.default?.()}
            </button>
        )
    }
})

