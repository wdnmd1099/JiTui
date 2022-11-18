import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from '../shared/Button';
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
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
                <MainLayout>{
                    {
                        title: () => '鸡腿记账',
                        icon: () => <Icon name='menu' class={s.navIcon} onClick={onClickMenu} />,
                        default: () => <>
                            <Center class={s.pig_wrapper} >
                                <Icon name='pig' class={s.pig}></Icon>
                            </Center>
                            <div class={s.button_wrapper}>
                                <RouterLink to={'/items/create'}>
                                    <Button class={s.button}>开始记账</Button>
                                </RouterLink>
                            </div>
                            <FloatButton iconName="add" />
                            {overlayVisible.value &&
                                <Overlay onClose={() => overlayVisible.value = false} />}
                        </>
                    }
                }</MainLayout>
            </div>
        )
    }
})


