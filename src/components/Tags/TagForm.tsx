import { Toast } from "vant";
import { defineComponent, PropType, reactive} from "vue";
import { useRouter } from "vue-router";
import { Button } from "../../shared/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { http } from "../../shared/Http";
import { Rules, validate } from "../../shared/validate";
import { refKind, refTagData } from "../Item/ItemCreate";
import s from './Tag.module.scss';
export const refChangeEnglishName = ()=>{ 
  if(refKind.value === '支出'){
    return 'expenses'
  }else if(refKind.value === '收入'){
    return 'income'
  }
}
export const TagForm = defineComponent({
  props:{
    resetTag:{
      type:Boolean as PropType<boolean>,
      default:false,
    },
  },
  setup(props,context){
    console.log(props.resetTag)
    const router = useRouter()
    
    const formData = reactive({
        name: refTagData.tagName,
        sign: refTagData.tagSign,
        kind:refChangeEnglishName(),
      })

      const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
      const onSubmit = async (e: Event) => {
        e.preventDefault()
        const rules: Rules<typeof formData> = [
          { key: 'name', type: 'required', message: '必填' },
          { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
          { key: 'sign', type: 'required', message: '必填' },
        ]
        Object.assign(errors, {
          name: undefined,
          sign: undefined
        })
        Object.assign(errors, validate(formData, rules))
        if(errors.name === undefined && errors.sign === undefined){
          const response = await http.post(`/tags`,formData,) // 创建标签
            .catch(()=>{
              alert('传递参数错误')
            })
            router.push('/items/create')
        }
        
      }


      const onClick = async()=>{  //修改标签
        if(props.resetTag === true){
          await http.patch(`tags/${refTagData.tagId}`,formData)
          .catch((e)=>{Toast('请求服务器错误')})
          router.push('/items/create')
        }
      }

      const xtype = ()=>{
       if( props.resetTag === true){
        return 'button'
       }else{
        return 'submit'
       }
      }


    return ()=>(
        <form class={s.form} onSubmit={onSubmit}>
            <div class={s.formRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>标签名</span>
                <div class={s.formItem_value}>
                  <input v-model={formData.name}
                   class={[s.formItem, s.input,
                    [formData.name === '' ? s.error : ''],
                    [formData.name.length > 4 ? s.error : '']]}></input>
                </div>
                <div class={s.formItem_errorHint}>
                  <span>{errors['name']?errors['name'][0] : ' '}</span>
                </div>
              </label>
            </div>


            <div class={s.formRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>符号 {formData.sign}</span>

                <div class={s.formItem_value}>
                  <EmojiSelect v-model={formData.sign} class={[s.formItem, s.emojiList, s.error]} />
                </div>
                
                <div class={s.formItem_errorHint}>
                  <span>{errors['sign']?errors['sign'][0] : ' '}</span>
                </div>
              </label>
            </div>


            <p class={s.tips}>记账时长按标签即可进行编辑</p>
            <div class={s.formRow}>
              <div class={s.formItem_value}>
                <Button class={[s.formItem, s.button]} type={xtype()} onClick={onClick}
                >确定</Button>
              </div>
            </div>
          </form>
    )
  }
})