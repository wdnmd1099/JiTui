import { preventDefault } from "vant/lib/utils";
import { defineComponent, PropType, reactive, ref } from "vue";
import { Button } from "./Button";
import s from './EmailInput.module.scss';
export const EmailInput = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const email = reactive([
            
        ])
        const onsubmit = (e: Event)=>{
            e.preventDefault(),
            console.log('button触发')
        }

        return () => (
            <>
                <form action="" onSubmit={onsubmit}>
                <div class={s.emailInputWrapper}>
                    <div class={s.email_title}>邮箱地址</div>
                    <input type="text" class={s.emailInput} placeholder='请输入邮箱，然后点发送验证码' />
                </div>
                <div class={s.verificationCodeInputWrapper}>
                    <div class={s.verificationCode_title}>验证码</div>
                    <div class={s.codeWrapper}>
                        <input type="text" class={s.verificationCodeInput} placeholder='输入6位数字' />
                        <Button class={s.verificationCodeButton}>发送验证码</Button>
                    </div>
                    <Button class={s.sign_in_button}>登录</Button>
                </div>
                </form>
            </>
        )
    }
})