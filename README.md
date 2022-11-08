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

















### 一些入门说明

JSX 是一种 JavaScript 的语法扩展，即 JSX = JavaScript + XML，即在 JavaScript 里面写 XML(不懂XML的，可以暂时把它当成HTML理解)，简单来说，就是利用XML语法来创建虚拟DOM，当遇到<>，JSX就当XML解析，遇到{}就当JavaScript解析，因为 JSX 的这个特性，所以它具备了 JavaScript 的灵活性，同时又具备了 XML的语义化和直观性。
https://blog.csdn.net/weixin_45727472/article/details/112253674



tsx可定义模板代码 ts就不含模板代码

