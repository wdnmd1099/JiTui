import { defineComponent, PropType, ref } from "vue";
import { Button } from "./Button";
import s from './LoadMoreButton.module.scss';
export const LoadMoreButton = defineComponent({
    props: {
        yesOrNo: { //
            type: Boolean as PropType<boolean>,
            // required: true,
        },
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>,
            // required: true,
        }
    },
    setup(props, context) {
        return () => (<>
            <div class={s.wrapper}>
                <div class={s.loadMoreTagsWrapper}>
                    {props.yesOrNo === true ?
                        <Button onClick={props.onClick} class={s.loadMoreTags}>点击加载更多</Button> :
                        <div class={s.noMoreTags}>没有更多</div>}
                </div>
            </div>
        </>
        )
    }
})