import { computed, defineComponent, PropType, ref } from 'vue';
import { emojiList } from './emojiList';
import s from './EmojiSelect.module.scss';
export const EmojiSelect = defineComponent({
  props: {
    modelValue: {  //formData.sign传过来的modelValue
      type: String
    }
  },

  setup: (props, context) => {
    
    const refSelected = ref(0)
    const table: [string, string[]] [] = [
      ['表情', ['face-smiling', 'face-affection', 'face-tongue', 'face-hand',
        'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
        'face-glasses', 'face-concerned', 'face-negative', 'face-costume'
      ]],
      ['手势', ['hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger',
        'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts']],
      ['人物', ['person', 'person-gesture', 'person-role', 'person-fantasy',
        'person-activity', 'person-sport', 'person-resting']],
      ['衣服', ['clothing']],
      ['动物', ['cat-face', 'monkey-face', 'animal-mammal', 'animal-bird',
        'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug']],
      ['植物', ['plant-flower', 'plant-other']],
      ['自然', ['sky & weather', 'science']],
      ['食物', [
        'food-fruit', 'food-vegetable', 'food-prepared', 'food-asian',
        'food-marine', 'food-sweet'
      ]],
      ['运动', ['sport', 'game']],
    ]
    const onClickTab = (index: number) => {
      refSelected.value = index
    }
    const onClickEmoji = (emoji: string) => {
       context.emit('update:modelValue', emoji) //传给TagCreate的formData.sign
    }
    const emojis = computed(() => {
      const selectedItem = table[refSelected.value][1] //refSelected.value是上面的中文，比如选中了 table[7] 食物，那么selectedItem就是食物的那个英文数组'food-fruit'....
      return selectedItem.map(category =>//遍历selectedItem
        emojiList.find(item => item[0] === category)?.[1]//对里面每个英文都去emojiList数据库里找到相对应的类型的emoji表情
          .map(emoji => <li class={emoji === props.modelValue ? s.selectedEmoji : ''}//找到这些实际的emoji表情之后，就把它们用li包住渲染到页面，同时对每个表情加一个click事件，点击后把emoji传出去
            onClick={()=>onClickEmoji(emoji)}>{emoji}</li>) //传参的onclick必须要用函数包住，否则将会相当于onclick返回值
      )
    })
    return () => (
      <div class={s.emojiList}>
        <nav>
          {table.map((item, index) => //index 是map 传回来的
            <span class={index === refSelected.value ? s.selected : ''}
              onClick={() => onClickTab(index)}>{item[0]}</span>)}
        </nav>
        <ol>
          {emojis.value}
        </ol>
      </div>
    )
  }
})