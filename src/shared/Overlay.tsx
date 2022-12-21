import { defineComponent, PropType, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Dialog } from 'vant'
import { Icon } from './Icon';
import { mePromise, refreshMe } from "./me";
import s from './Overlay.module.scss';
export const Overlay = defineComponent({
  props:{
    onClose:{
        type:Function as PropType<()=>void>
    }
  },
  setup(props,context){
    const close =()=>{
        props.onClose?.()
    }
    const router = useRouter()
    const onClickSignIn = () => { // vant 的退出弹框组件
      if( !refUserEmail.value ){
        router.push('/sign_in')
      }else if(refUserEmail.value){
        Dialog.confirm({
          title: '确认',
          message:
            '确认要退出吗？',
        })
          .then(() => {
            localStorage.removeItem('jwt')
            location.reload()
          })
          .catch(() => {});
      }
    }

    mePromise?.then((x1)=>{ refUserEmail.value = x1.data.resource.email },()=>{}) //从响应拿到用户email
    const refUserEmail = ref<any>(undefined)

    return ()=>(
      <>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>
        <section class={s.currentUser}>
        <h2>{ refUserEmail.value ? refUserEmail.value : '未登录用户' }</h2>
        <p  onClick={onClickSignIn}> { refUserEmail.value ? '点击退出登录' : '点击登录' }</p>
        </section>
        <nav>
            <ul class={s.action_list}>
                <li>
                    <RouterLink to="/statistics" class={s.action}>
                    <Icon name="charts"></Icon>
                    <span>统计图表</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/export" class={s.action}>
                    <Icon name="export"></Icon>
                    <span>导出数据</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/notify" class={s.action}>
                    <Icon name="notify"></Icon>
                    <span>提醒记账</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
      </div>
      </>
    )
  }
})