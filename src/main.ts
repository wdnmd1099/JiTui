import { routes } from './config/routes';
import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { history } from './shared/history';
import '@svgstore';
import { mePromise, fetchMe } from './shared/me';

fetchMe() // 发请求拿用户信息，这个函数会把请求结果发送给mePromise
const router = createRouter({ history, routes })
router.beforeEach(async (to, from) => { //白名单设置，白名单以外的页面都要接受登录状态检查，没登录的跳转到登录页
    if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in')
        || to.path === '/start') {
        return true
    } else {
        const path = await mePromise!.then( // 把请求的结果then ，！表示断言此属性必定存在
            () => { return true },
            () => '/sign_in?return_to=' + to.path
        )
        return path
    }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
