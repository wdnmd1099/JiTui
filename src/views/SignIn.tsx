import { defineComponent, PropType, ref } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { EmailInput } from "../shared/EmailInput";
import { Icon } from "../shared/Icon";
import { Overlay } from "../shared/Overlay";
import { TitleAndLogo } from "../shared/TitleAndLogo";
import s from './SignIn.module.scss';
export const SignIn = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const overlayVisible = ref(false)
        const onClickMenu = () => {
            overlayVisible.value = !overlayVisible.value;
        }
        return () => (<>
            <MainLayout>{
                {
                    title: () => '登录',
                    icon: () => <Icon name='menu' onClick={onClickMenu} />,
                    default: () => (<>
                        <TitleAndLogo title="鸡腿记账" />
                        <EmailInput />
                        


                        <div>{overlayVisible.value &&
                            <Overlay onClose={() => overlayVisible.value = false} />}
                        </div>

                    </>
                    )
                }
            }</MainLayout>
        </>
        )
    }
})