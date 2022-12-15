import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';
export const ForthActions = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <RouterLink to="/start" >完成</RouterLink>
    <SkipFeatures />
  </div>
)

ForthActions.displayName = 'ForthActions'