import { defineComponent, PropType, ref } from "vue";
import { Icon, IconName } from "./Icon";
import s from './FloatButton.module.scss';
import { useRouter } from "vue-router";
export const FloatButton = defineComponent({
  props:{
    iconName:{
      type:String as PropType<IconName>,
      required:true,
    }
  },
  setup(props,context){
    const router = useRouter()
    return ()=>(
      <div class={s.floatButton} onClick={()=>{router.push('/items/create')}}> 
        <Icon name={props.iconName} class={s.icon}/>
      </div>
    )
  }
})