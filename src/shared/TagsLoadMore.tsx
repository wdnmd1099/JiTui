import { ref } from "vue"
import { refExpensesTags, refKind } from "../components/Item/ItemCreate"
import { http } from "./Http"

export const refLoadMoreMessage = ref<any>([   //加载更多表驱动
    { name: '支出', yesOrNo: true, page: 1 },
    { name: '收入', yesOrNo: true, page: 1 },
    
])

const ButtonOnLoad = (refValue: number, response: any) => {
    if (refValue !== 0 && refValue === 25) { //点击加载更多，下一页图标为25个的直接渲染
        response.data.resources.map((item: any) => { return refExpensesTags.value.push(item) })
    } else if (refValue !== 0 && refValue < 25) { //下一页标签大于0小于25的渲染后显示没有更多
        response.data.resources.map((item: any) => { return refExpensesTags.value.push(item) })
        refLoadMoreMessage.value.map((item: { name: any; yesOrNo: any }) => {
            if (refKind.value === item.name) {
                item.yesOrNo = false
            }
        })
    } 
}


export const onLoadMore = async () => {  // 加载更多标签的点击事件
    if (refKind.value === '支出') {
        const response: any = await http.get('/tags', {
            // _mock:'tagIndex', //假数据
            kind: 'expenses',
            page: refLoadMoreMessage.value[0].page += 1
        })
        ButtonOnLoad(response.data.pager.count, response)
    } else if (refKind.value === '收入') {
        const response: any = await http.get('/tags', {
            // _mock:'tagIndex', //假数据
            kind: 'income',
            page: refLoadMoreMessage.value[1].page += 1
        })
        ButtonOnLoad(response.data.pager.count, response) // response.data.pager.count 是此页的标签数量
    }
};