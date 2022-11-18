import { defineComponent } from "vue";
import { Navbar } from "../shared/Navbar";
export const MainLayout = defineComponent({
    
  setup(props,context){
    const slots = context.slots;
    return ()=>( //调用组件时，标签和{} 之间不能有空格，否则会当成数组解析而不是对象
        <div>
        <nav>
            <Navbar>{
                {default:()=>slots.title?.(),
                 icon:()=>slots.icon?.(),
                }
            }</Navbar>
        </nav>
        {slots.default?.()}
        </div>
    )
  }
})