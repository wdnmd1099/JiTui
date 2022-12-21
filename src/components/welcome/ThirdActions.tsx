import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { FunctionalComponent } from 'vue';
import { SkipFeatures } from '../../shared/SkipFeatures';
export const ThirdActions: FunctionalComponent = () => {
  const onClick = ()=>{
    localStorage.setItem('skipFeatures','yes')
}
  return <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <span onClick={onClick}>
    <RouterLink to="/welcome/4" >下一页</RouterLink>
    </span>
    <SkipFeatures/>
  </div>
}

ThirdActions.displayName = 'ThirdActions'
