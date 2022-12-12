import axios from "axios";
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

        const refChangeVerificationCode = ref(false)
        const timer = ref<number>()
        const count = ref<number>(3)
        const onClickVerificationCode = async ()=>{
            // const response = await axios.post('/api/v1/validation_codes',{email:formData.email})
            // .catch(()=>{alert('发送失败')})
           
            refChangeVerificationCode.value=true
            timer.value = setInterval(()=>{
                count.value -= 1
                if(count.value === 0){
                    clearInterval(timer.value)
                    count.value=3
                    refChangeVerificationCode.value = false
                }
            },1000)
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
                            <Button disabled={refChangeVerificationCode.value} class={s.verificationCodeButton}
                            onClick={onClickVerificationCode}>
                                {refChangeVerificationCode.value === false? '发送验证码' : count.value}
                            </Button>
                            <div class={s.code_err}>{errors.code?.[0]?errors.code?.[0]:' '}</div>
                        </div>
                        <Button type='submit' class={s.sign_in_button}
                            onClick={() => {}}
                        >登录</Button>
                    </div>
                </form>
            </>
        )
    }
})