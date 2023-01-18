import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { FirstActions } from "../components/welcome/FirstActions";
import { Forth } from "../components/welcome/Forth";
import { ForthActions } from "../components/welcome/ForthActions";
import { Second } from "../components/welcome/Second";
import { SecondActions } from "../components/welcome/SecondActions";
import { Third } from "../components/welcome/Third";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { Welcome } from "../views/Welcome";
import { StartPage } from '../views/StartPage'
import { ItemPage } from "../views/ItemPage";
import { ItemList } from "../components/Item/ItemList";
import { ItemCreate } from "../components/Item/ItemCreate";
import { TagPage } from "../views/TagPage";
import { TagCreate } from "../components/Tags/TagCreate";
import { TagEdit } from "../components/Tags/TagEdit";
import { SignIn } from "../views/SignIn";
import { StatisticsPage } from "../components/statistics/Charts";
import { Notify } from "../shared/Notify";
import { QRcodeLoad } from "../shared/QRcodeLoad";
//如果没反应的话先看看父路由有没有写<RouterView/>

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: Welcome,
    beforeEnter:(to,form,next)=>{  //进入前先看看之前是否按过跳过，如果之前按过跳过，就不需要再看一次欢迎界面了
      localStorage.getItem('skipFeatures') === 'yes' ? next('/items') : next()
    },
    children: [
      { path: '', redirect: '/welcome/1', },
      { path: '1', name: 'welcome1', components: { main: First, footer: FirstActions }, },
      { path: '2', name: 'welcome2', components: { main: Second, footer: SecondActions }, },
      { path: '3', name: 'welcome3', components: { main: Third, footer: ThirdActions }, },
      { path: '4', name: 'welcome4', components: { main: Forth, footer: ForthActions }, },
    ]
  },
  { path: '/start', component: StartPage },
  { path: '/items', component: ItemPage,
    // 下面这些没用，只做解释学习用，在main.tsx 里做了统筹的白名单，非白名单都检查是否登录
    // beforeEnter:async(to,from,next)=>{ //在进入此页面之前，向服务器发送一个get请求查看用户的me文件
    //  await http.get('/me').catch(()=>{ //如果服务器没有就会返回错误码，有错误码就跳转到登录页面
    //     next('/sign_in?return_to=' + to.path)
    //  })
    //  next()
    // },
    children:[
      {path:'',component:ItemList},
      {path:'create',component:ItemCreate},
    ]
  },

  { path: '/tags', component: TagPage,
    children:[
      {path:'create',component:TagCreate},
      {path:':id/edit',component:TagEdit},
    ]
  },
  {
    path:'/sign_in',component:SignIn,
  },
  {
    path:'/statistics',component:StatisticsPage,
    children:[
      {path:'create',component:TagCreate},
      {path:':id/edit',component:TagEdit},
    ]
  },
  { path:'/notify', component:Notify},
  { path:'/export', component:Notify},
  { path:'/QRcodeLoad',component:QRcodeLoad}

]