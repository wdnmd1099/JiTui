import s from './welcome.module.scss';
export const First = () => (
  <div class={s.card}>
    <svg>
      <use xlinkHref='#pig'></use>
    </svg>
    <h2>精打细算<br />加根鸡腿吧</h2>
  </div>
)
First.displayName = 'First'


