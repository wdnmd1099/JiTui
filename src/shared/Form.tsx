import { computed, defineComponent, PropType, ref } from "vue";
import s from './Form.module.scss';
export const Form = defineComponent({
  props: {
    type: {
      type: String as PropType<"select">
    },
    label: {
      type: String as PropType<string>
    },
    options: Array as PropType<Array<{ value: string, text: string }>>
  },
  setup(props, context) {
    const content = computed(() => {
      switch (props.type) {
        case 'select':
          // console.log('cao')
          return <div class={s.selectWrapper}>
            <div class={s.label}>{props.label}</div>
          <select class={[s.select]} onChange={(e: any) => { console.log(e.target.value) }} >
            {props.options?.map(item =>
              <option value={item.value}>{item.text}</option>
            )}
          </select>
          </div>
        // context.emit('update:modelValue', e.target.value)
      }
    })
    return () => (
      <div>{content.value}</div>
      // console.log(content.value)
    )

  }
})