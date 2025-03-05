<template>
  <div id="myChart"></div>
</template>

<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=pie-simple
export default {
  name: "PieChart",
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {

    setTimeout(() => {
      this.drawLine();
    }, 10)
  },
  methods: {
    // 该方法必须放在方法域中的最后一个
    drawLine() {
      // 基于准备好的dom，初始化echarts实例

      // 指定图表的配置项和数据
      var option = {
        //设置图标标题
        title: {text: '在Vue中使用echarts-pieChart'},
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              {value: 235, name: '参数一'},
              {value: 274, name: '参数二'},
              {value: 310, name: '参数三'},
              {value: 335, name: '参数四'},
              {value: 400, name: '参数五'}
            ],
            roseType: 'angle',
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('myChart'))
      var myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("myChart")) : instanceByDom
      // var myChart = this.$echarts.init(window.document.getElementById("myChart"))
      myChart.clear()
      myChart.setOption(option)
      window.onresize = function () {
        myChart.resize();
      };
    }
  }
}
</script>

<style scoped>
#myChart {
  width: 100%;
  height: 400px
}
</style>