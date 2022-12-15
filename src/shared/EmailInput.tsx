import axios from "axios";
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Button } from "./Button";
import s from './EmailInput.module.scss';
import { http, wrongMessage } from "./Http";
import { refreshMe } from "./me";
import { validate } from "./validate";
export const EmailInput = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const formData = reactive({
            email: '879611700@qq.com',
            code: '437382'
        })
        const errors = reactive({
            email: [],
            code: []
        })
        const router = useRouter()
        const onSubmit = async (e: Event) => {
            e.preventDefault()
            Object.assign(errors, {
                email: [], code: []
            })
            Object.assign(errors, validate(formData, [
                { key: 'email', type: 'required', message: '必填' },
                { key: 'email', type: 'pattern', regex: /.+@.+/gm, message: '必须是邮箱地址' },
                { key: 'code', type: 'required', message: '必填' },
                { key: 'code', type: 'pattern', regex: /[0-9]{6}/gm, message: '必须是6位数字' },
            ]))
            if (errors.code.length === 0 && errors.email.length === 0) { // 没有任何错误信息再提交登录
                const response = await http.post<{ jwt: string }>('/session', formData)
                localStorage.setItem('jwt', response.data.jwt)
                const returnTo = localStorage.getItem('returnTo')
                refreshMe()
                router.push(returnTo ? returnTo : '/')
                
                
            }

        }

        const refChangeVerificationCode = ref(false)
        const timer = ref<number>()
        const count = ref<any>('正在发送')
        const responseErr = [
            { errNumber: 422, message: '发送失败，请检查邮箱地址是否正确' },
            { errNumber: 429, message: '发送频率过快，请稍后再试' },
            { errNumber: 500, message: '服务器繁忙' },
        ]
        const onClickVerificationCode = async () => {
            Object.assign(errors, { email: [], code: [] })   // 重置发送验证码错误提示

            if (/.+@.+/gm.test(formData.email.toString()) === true) { //验证邮箱地址是否正确
                refChangeVerificationCode.value = true  // 点击发送验证码立刻开始计时
                count.value = 6  // 默认6秒
                timer.value = setInterval(() => {
                    count.value -= 1
                    if (count.value === 0) {
                        clearInterval(timer.value) // 重置计时器
                        count.value = 6
                        refChangeVerificationCode.value = false
                    }
                }, 1000)
                const response = await axios.post('/api/v1/validation_codes', { email: formData.email }) //发送验证码
                    .catch((e) => {
                        responseErr.map(item => {
                            if (e.response.status === item.errNumber) {
                                Object.assign(errors, { email: [item.message], code: [] }) // 发送验证码错误提示
                                count.value = 3 //如果服务器返回错误验证码，重置计时器
                            }
                        })
                    })
            } else {
                Object.assign(errors, { email: ['发送失败，请检查邮箱地址是否正确'], code: [] })
            }



        }
        return () => (
            <>
                <form action="" onSubmit={onSubmit}>
                    <div class={s.emailInputWrapper}>
                        <div class={s.email_title}>邮箱地址</div>
                        <input type="text" v-model={formData.email} class={s.emailInput} placeholder='请输入邮箱，然后点发送验证码' />
                        <div class={s.email_err}>{errors.email?.[0] ? errors.email?.[0] : ' '}</div>
                    </div>

                    <div class={s.verificationCodeInputWrapper}>
                        <div class={s.verificationCode_title}>验证码</div>
                        <div class={s.codeWrapper}>
                            <input type="text" v-model={formData.code} class={s.verificationCodeInput} placeholder='输入6位数字' />
                            <Button disabled={refChangeVerificationCode.value} class={s.verificationCodeButton}
                                onClick={onClickVerificationCode}>
                                {refChangeVerificationCode.value === false ? '发送验证码' : count.value}
                            </Button>
                            <div class={s.code_err}>{errors.code?.[0] ? errors.code?.[0] : ' '}</div>
                        </div>
                        <Button type='submit' class={s.sign_in_button}>登录</Button>
                    </div>
                </form>
            </>
        )
    }
})