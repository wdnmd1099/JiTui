import { defineComponent, PropType} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon';
import { TagForm } from './TagForm';
import s from './Tag.module.scss';
import { useRouter } from 'vue-router';
import { http } from '../../shared/Http';
import { refTagData } from '../Item/ItemCreate';
import { Dialog, Toast } from 'vant';
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const router = useRouter()
    const onClick = ()=>{
      Dialog.confirm({
        title: '提示',
        message:
          '删除标签的同时会删除对应的账单',
      })
        .then(() => {
          http.delete(`tags/${refTagData.tagId}`)
          .then(()=>{router.push('/items/create')})
          .catch(()=>{Toast('网络请求失败')})
        })
        .catch(() => {});
    }
    return () => (
      <>
        <div>
        <MainLayout>{{  
            title: () => '标签详情',
            icon: () => <Icon name="left" onClick={() => { router.push('/items/create') }} />,
            default:()=> (<>
             <TagForm  resetTag={true}/>
             <div class={s.actions}>
              <Button level='danger' class={[s.removeTags]} onClick={onClick}>删除标签</Button>
             </div>
            </>
            )
          }}</MainLayout>
        </div>
      </>
    )
  }
})