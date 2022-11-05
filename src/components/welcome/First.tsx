import s from './welcome.module.scss';
import { FunctionalComponent } from 'vue';
export const First: FunctionalComponent = () => {
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#pig'></use>
    </svg>
    <h2>精打细算<br />加根鸡腿吧</h2>
  </div>
}

First.displayName = 'First'
