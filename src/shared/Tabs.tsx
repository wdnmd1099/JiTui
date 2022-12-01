import { defineComponent, PropType, ref } from "vue";
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
    props: {
        selected: {
            type: String as PropType<string>,
            required:false
        },
    },
    emits:['update:selected'],
    setup(props, context) {
        return () => {
            const array = context.slots?.default?.()
            // console.log(array)
            //array 是数组，数组里面是 Tab 组件的内容
            if (!array) return () => null
            for (let i = 0; i < array?.length; i++) {
                if (array[i].type !== Tab) { //遍历Tabs 的内容，如果有不是Tab 组件的内容，就抛出错误
                    throw new Error('<Tabs> only accepts <Tabs> as children')
                }
            }
            return <div class={s.tabs}>
                <ol class={s.tabs_nav}>
                    {array.map(item =>
                        <li class={item.props?.name === props.selected ? s.selected : ''}
                        onClick={()=> context.emit('update:selected',item.props?.name)}
                        // 被点击的li的name传给selected，双向绑定，所以name 和 selected 永远相等
                        // 然后给被点击的li 加上样式
                        >
                         {item.props?.name}
                        </li>)}
                </ol>
                <div>
                    {array.find(item => item.props?.name === props.selected)}
                    {/* 找到当前选中的Tab组件，把它的context.slots?.default渲染到页面,不理解的话打开下面的关闭上面的就知道了 */}
                    {/* {<Tab name="支出"><div>xxxxxx</div></Tab>} */}
                </div>
            </div>
        }
    }
}
)


export const Tab = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        },
    },
    setup(props, context) {
        return () => (
            <div>{context.slots.default?.()}</div>
        )
    }
})