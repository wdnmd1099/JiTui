import { defineComponent, PropType, reactive, ref } from "vue";
import { Button } from "./Button";
import s from './EmailInput.module.scss';
import { validate } from "./validate";
export const EmailInput = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const formData = reactive({
            email: '',
            code: ''
        })
        const errors = reactive({
            email: [],
            code: []
        })
        const onsubmit = (e: Event) => {
            e.preventDefault()
            Object.assign(errors, {
                email: [], code: []
            })
            Object.assign(errors, validate(formData, [
                { key: 'email', type: 'required', message: '必填' },
                { key: 'email', type: 'pattern', regex: /.+@.+/gm, message: '必须是邮箱地址' },
                { key: 'code', type: 'required', message: '必填' },
            ]))
        }
        return () => (
            <>
                <form action="" onSubmit={onsubmit}>
                    <div class={s.emailInputWrapper}>
                        <div class={s.email_title}>邮箱地址</div>
                        <input type="text" v-model={formData.email} class={s.emailInput} placeholder='请输入邮箱，然后点发送验证码' />
                        <div class={s.email_err}>{errors.email?.[0]?errors.email?.[0]:' '}</div>
                    </div>

                    <div class={s.verificationCodeInputWrapper}>
                        <div class={s.verificationCode_title}>验证码</div>
                        <div class={s.codeWrapper}>
                            <input type="text"  v-model={formData.code} class={s.verificationCodeInput} placeholder='输入6位数字' />
                            <Button class={s.verificationCodeButton}>发送验证码</Button>
                            <div class={s.code_err}>{errors.code?.[0]?errors.code?.[0]:' '}</div>
                        </div>
                        <Button class={s.sign_in_button}
                            onClick={() => {}}
                        >登录</Button>
                    </div>
                </form>
            </>
        )
    }
})