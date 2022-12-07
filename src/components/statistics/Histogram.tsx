import { defineComponent, onMounted, PropType, ref } from "vue";
import s from './Histogram.module.scss';
import * as echarts from 'echarts';
export const Histogram = defineComponent({
  props:{
    name:{
        type:String as PropType<string>
    }
  },
  setup(props,context){
    const refDiv = ref<HTMLDivElement>()
    onMounted(()=>{
        if(!refDiv.value){return}
        var myChart = echarts.init(refDiv.value);
        myChart.setOption({
          grid:[
            {left:0, top:0, right:0}
          ],
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        });
      })
    return ()=>(
        <div ref={refDiv} class={s.refDiv}></div>

    )
  }
})