import { defineComponent, PropType} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon';
import { TagForm } from './TagForm';
import s from './Tag.module.scss';
export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <>
        <div>
        <MainLayout>{{  
            title: () => '标签详情',
            icon: () => <Icon name="left" onClick={() => { }} />,
            default:()=> (<>
             <TagForm/>
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