import { defineComponent, PropType, ref } from "vue";
import { useRouter } from "vue-router";
import s from './AddButton.module.scss';
import { Icon } from "./Icon";
export const AddButton = defineComponent({
  props:{
    name:{
        type:String as PropType<string>
    }
  },
  setup(props,context){
    const router = useRouter()
    return ()=>(
      <div class={s.wrapper} onClick={()=>{router.push('/items/create')}}>
        <Icon name={'add'} class={s.icon}></Icon>
      </div>
    )
  }
})