import { defineComponent, PropType} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon';
import { TagForm } from './TagForm';
import s from './Tag.module.scss';
import { useRouter } from 'vue-router';
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const router = useRouter()
    return () => (
      <>
        <div>
        <MainLayout>{{  
            title: () => '标签详情',
            icon: () => <Icon name="left" onClick={() => { router.push('/items/create') }} />,
            default:()=> (<>
             <TagForm />
             <div class={s.actions}>
              <Button level='danger' class={[s.removeTags]} onClick={()=>{}}>删除标签</Button>
              <Button level='danger' class={s.removeTagsAndItems} onClick={()=>{}}>删除标签和记账</Button>
             </div>
            </>
            )
          }}</MainLayout>
        </div>
      </>
    )
  }
})