import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, routerKey, RouterView, useRoute, useRouter } from 'vue-router';
import { useSwipe } from '../hooks/useSwipe';
import { throttle } from '../shared/throttle';
import s from './Welcome.module.scss'


let x: number | undefined = undefined;
export const Welcome = defineComponent({
  setup: (props, context) => {

    // 首次进入先把main定义传进去走一遍useSwipe，然后return之后，main才绑到 main标签上
    //然后 main 把main标签这个HTMLElement 传给useSwipe，才开始监听它并运行useSwipe
    //所以ref就是一个传标签实例的东西
    const main = ref<HTMLElement>()
    const route = useRoute()  //useRoute 是路由信息 userRouter 是路由器
    const router = useRouter()
    const { direction, swiping } = useSwipe(main, { beforeStart: e => e.preventDefault() })
    const push = throttle(() => {
      if (route.name === 'welcome1') {
        router.push('/welcome/2')
      } else if (route.name === 'welcome2') {
        router.push('/welcome/3')
      } else if (route.name === 'welcome3') {
        router.push('/welcome/4')
      } else if (route.name === 'welcome4') {
        localStorage.setItem('skipFeatures','yes')
        router.push('/start')
      }
    }, 1000)
    watchEffect(() => {
      if (swiping.value && direction.value === "left") {
        push()
      }
    })


    return () => (<div class={s.wrapper}>
      <header >
        <svg>
          <use xlinkHref='#jitui'></use>
        </svg>
        <h1>鸡腿记账</h1>
      </header>
      <main class={s.main} ref={main}>
        <RouterView name="main">
          {({ Component: C, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) => {
            if (x === undefined) {
              x = parseInt(R.fullPath[9])
              return <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}>
                {C}
              </Transition>
            } else if (parseInt(R.fullPath[9]) > x) {
              x = parseInt(R.fullPath[9])
              return <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}>
                {C}
              </Transition>
            }
            else if (parseInt(R.fullPath[9]) < x) {
              x = parseInt(R.fullPath[9])
              return <Transition
                enterFromClass={s.slide_fade2_enter_from}
                enterActiveClass={s.slide_fade2_enter_active}
                leaveToClass={s.slide_fade2_leave_to}
                leaveActiveClass={s.slide_fade2_leave_active}>
                {C}
              </Transition>
            }
          }
          }
        </RouterView>

      </main>
      <footer>
        <RouterView name="footer" />
      </footer>
    </div>)
  }
})




