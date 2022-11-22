import { defineComponent, PropType, ref } from "vue";
// import s from './TagEdit.module.scss';
export const TagEdit = defineComponent({
  props:{
    name:{
        type:String as PropType<string>
    }
  },
  setup(props,context){
    return ()=>(
      <div>tagEdit</div>
    )
  }
})