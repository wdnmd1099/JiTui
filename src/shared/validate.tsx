interface FData {
  [k: string]: string | number | null | undefined | FData
}
type Rule<T> = {
  key: keyof T
  message: string
} & (
    { type: 'required' } |
    { type: 'pattern', regex: RegExp }
  )
type Rules<T> = Rule<T>[]
export type { Rules, Rule, FData }
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[]
  }
  const errors: Errors = {}
  rules.map(rule => {
    const { key, type, message } = rule
    const value = formData[key] // obj['key'] 可以找到对应的对象内容，注意里面是字符串
    switch (type) {
      case 'required':
        if (isEmpty(value)===true) { //isEmpty 判断元素是否为空 空就返回true
          errors[key] = errors[key] ?? [] //如果errors[key]为空，就返回[]
          errors[key]?.push(message)
        }
        break;
      case 'pattern':
        if (!isEmpty(value) && !rule.regex.test(value!.toString())) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break;
      default:
        return
    }
  })
  return errors
}

function isEmpty(value: null | undefined | string | number | FData) {
  return value === null || value === undefined || value === ''
}


// interface FData {
//     [k: string]: string | number | null | undefined | FData
//   }
//   type Rule<T> = {
//     key: keyof T
//     message: string
//   } & (
//       { type: 'required' } |
//       { type: 'pattern', regex: RegExp }
//     )
//   type Rules<T> = Rule<T>[]
//   export type { Rules, Rule, FData }
//   export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
//     type Errors = {
//       [k in keyof T]?: string[]
//     }
//     const errors: Errors = {}
//     rules.map(rule => {
//       const { key, type, message } = rule
//       const value = formData[key]
//       switch (type) {
//         case 'required':
//           if (value === null || value === undefined || value === '') {
//             errors[key] = errors[key] ?? []
//             errors[key]?.push(message)
//           }
//           break;
//         case 'pattern':
//           if (value && rule.regex.test(value.toString())===false ) {
//             errors[key] = errors[key] ?? []
//             errors[key]?.push(message)
//           }
//           break;
//         default:
//           return
//       }
//     })
//     return errors
//   }


