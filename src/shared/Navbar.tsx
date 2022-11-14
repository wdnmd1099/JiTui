import { defineComponent, ref } from "vue";
export const test = defineComponent({
  setup(props,context){
    return ()=>(
      <div>test</div>
    )
  }
})