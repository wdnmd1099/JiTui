import { defineComponent, PropType, reactive, ref } from "vue";
export const TagEdit = defineComponent({
  setup(props,context){
    const x1 = reactive({
      c:123
    })
    return ()=>(
      <>
      <div>xxx</div>
      </>
    )
  }
})