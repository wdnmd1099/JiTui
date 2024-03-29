import { defineComponent, PropType, ref, watch } from "vue";
import { itemSelected, refTagData } from "../components/Item/ItemCreate";
import { refChartChangeType } from "./Form";
import s from './Tabs.module.scss';
import { diyStartDate, diyEndDate } from "./TimeSelected";
export const Tabs = defineComponent({
    props: {
        selected: {
            type: String as PropType<string>,
            required: false,
        },
        rerenderOnSelected: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        resetSelectInput: { // 是否重置类型选择框，用来解决选中收入后切到别的tag时显示的是支出实际的图是收入的数据
            type: Boolean as PropType<boolean>,
            default: false,
        }
    },
    emits: ['update:selected'],
    setup(props, context) {
        props.resetSelectInput === true ?   // 重置类型选择框为'expenses'
            watch(() => props.selected, () => {
                refChartChangeType.value = 'expenses'
            }) : ''
        props.selected != '自定义时间' ? // 离开自定义时间时，重置已选择的时间，可以解决可视化图表的显示bug
            watch(() => props.selected, () => {
                itemSelected.value = { name: '', sign: '', id: 0, amount: 0 }
                diyStartDate.value = ''
                diyEndDate.value = ''
            }) : ''
        return () => {
            const tabsArray = context.slots?.default?.()
            // console.log(array)
            //array 是数组，数组里面是 Tab 组件的内容
            if (!tabsArray) return () => null
            for (let i = 0; i < tabsArray?.length; i++) {
                if (tabsArray[i].type !== Tab) { //遍历Tabs 的内容，如果有不是Tab 组件的内容，就抛出错误
                    throw new Error('<Tabs> only accepts <Tabs> as children')
                }
            }
            return <div class={s.tabs}>
                <ol class={s.tabs_nav}>
                    {tabsArray.map(item =>
                        <li class={item.props?.name === props.selected ? s.selected : ''}
                            onClick={() => { context.emit('update:selected', item.props?.name) }
                            }
                        // 被点击的li的name传给selected，双向绑定，所以name 和 selected 永远相等
                        // 然后给被点击的li 加上样式
                        >
                            {item.props?.name}
                        </li>)}
                </ol>
                <div>
                    {/*false是不需要它重新渲染，只需要全部渲染一次就可以了
                    ，echarts插件一开始不能获取display：none的宽高，不能渲染，所以加了个rerenderOnSelected选项，true就强制重新渲染*/}
                    {props.rerenderOnSelected === false ?
                        tabsArray.map(item =>
                            (<div v-show={item.props?.name === props.selected}>{item}</div>)
                        ) :
                        <div key={props.selected}> {/*key={props.selected} 不会被浏览器缓存导致动画缺失*/}
                            {tabsArray.find(item => item.props?.name === props.selected)}
                        </div>
                    }
                    {/* 一开始写成下面这句，导致初始化的时候只跑了一次，不能使所有的tab组件都跑一次，导致bug */}
                    {/* {tabsArray.find(item => item.props?.name === props.selected)} */}
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