### 环境搭建
```
npm config set save-prefix=''  //锁定npm的版本号

yarn add pnpm@7.13.2    

yarn add node@17.7.1

yarn add @vitejs/plugin-vue-jsx@1.3.9   

yarn add vue@3.2.25

yarn add @vitejs/plugin-vue@3.1.2

yarn add vite@3.1.6

yarn add vue-router@4.0.14

yarn add sass@1.49.11

yarn add svgstore@3.0.1

yarn add vant@3.4.8   //ui库
yarn add -D vite-plugin-style-import@1.4.1 //ui库的css加载插件 
这里测试过新版的vant和vite-plugin-style-import不能一起用
而且尝试过vant网站推荐的插件unplugin-vue-components 也是不能用的

yarn add echarts@5.3.2

yarn add axios@0.27.2

yarn add @faker-js/faker@7.3.0


```

## 搭建完成运行 npx pnpm run dev






## 编码规范

### 推荐使用
```
const main = ref<HTMLElement>()   //默认为undefined
```
### 不推荐
```
const main = ref<HTMLElement | null>(null) 
```
### 一些问题
//调用组件时，标签和 {} 之间不能有空格，否则会当成数组解析而不是对象



### 组件
TagCreate 输入表情和标题的组件

Tabs 和 Tab  导航栏，比如支出和收入的导航栏切换，
它接受一个name当导航栏的文字，通过ref传不同的name来切换导航，v-model ref双向绑定，ItemCreate有使用示例

