import { defineComponent } from "vue";
import { Navbar } from "../shared/Navbar";
export const MainLayout = defineComponent({
    
  setup(props,context){
    const slots = context.slots;
    return ()=>(
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