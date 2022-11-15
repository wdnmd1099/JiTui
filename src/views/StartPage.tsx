import { defineComponent, ref } from "vue";
import { Button } from '../shared/Button';
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import { Overlay } from "../shared/Overlay";
import s from './StartPage.module.scss';
export const StartPage = defineComponent({
    setup(props, context) {
        const overlayVisible = ref(false)
        const onClickMenu = ()=>{
            overlayVisible.value = !overlayVisible.value;
        }
        return () => (
            <div>
            <nav>
                <Navbar>{
                    {default:()=>'鸡腿记账',
                     icon:()=><Icon name='menu' class={s.navIcon} onClick={onClickMenu}/>
                    }
                }</Navbar>
            </nav>
            <Center class={s.pig_wrapper} >
                <Icon name='pig' class={s.pig}></Icon>
            </Center>
            <div class={s.button_wrapper}>
                <Button class={s.button}>开始记账</Button>
                <FloatButton iconName="add"/>
            </div>
            {overlayVisible.value && 
            <Overlay onClose={()=>overlayVisible.value=false}/>}
            
            </div>
        )
    }
})


