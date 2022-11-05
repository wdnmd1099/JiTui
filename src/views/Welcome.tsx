import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import { useSwipe } from '../hooks/useSwipe';
import s from './Welcome.module.scss'


let x: number | undefined = undefined;
export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement | null>(null)
    const { direction, swiping } = useSwipe(main)
    watchEffect(() => {
      console.log(swiping.value, direction.value)
    })
    return () => <div class={s.wrapper}>
      <header>
        <svg>
          <use xlinkHref='#jitui'></use>
        </svg>
        <h1>鸡腿记账</h1>
      </header>
      <main class={s.main} ref={main}>
        <RouterView name="main">
          {({ Component: C, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) => {
            if(x===undefined){
              x = parseInt(R.fullPath[9])
              return <Transition
              enterFromClass={s.slide_fade_enter_from}
              enterActiveClass={s.slide_fade_enter_active}
              leaveToClass={s.slide_fade_leave_to}
              leaveActiveClass={s.slide_fade_leave_active}>
              {C}
            </Transition>
            }else if (parseInt(R.fullPath[9])>x) {  
              x = parseInt(R.fullPath[9])
              return <Transition
              enterFromClass={s.slide_fade_enter_from}
              enterActiveClass={s.slide_fade_enter_active}
              leaveToClass={s.slide_fade_leave_to}
              leaveActiveClass={s.slide_fade_leave_active}>
              {C}
            </Transition>
            }
            else if(parseInt( R.fullPath[9])<x){
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
    </div>
  }
})