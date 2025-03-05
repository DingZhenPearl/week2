<template class="lineChartBox">
  <div id="myChart"></div>
</template>

<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=line-simple
export default {
  name: "LineChart",
  // 数据域
  data() {
    return {
      apiData: [1, 2, 3, 4, 5],
      label: [1, 2, 3, 4, 5]
    }
  },
  // 钩子函数
  mounted() {

    setTimeout(() => {
      // 该方法必须放在方法域中的最后一个
      this.drawLine();
    }, 10)
  },

  // 方法区
  methods: {
    // 方法域中的其他方法


    // 该方法必须放在方法域中的最后一个
    drawLine(){
      var option = {
        //网格配置 grid可以控制线性图 柱状图 图表大小
        grid: {
          left: '1%',
          containLabel: true
        },
        //设置图标标题
        title: {text: '数值'},
        //图标提示框组件
        tooltip: {
          position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = {top: 60};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
            return obj;
          }
        },
        //设置x轴配置
        xAxis: {
          data: this.label
        },
        yAxis: {},
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [{
          name: '参数值',
          type: 'line',
          data: this.apiData
        }]
      }
      // 基于准备好的dom，初始化echarts实例
      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('myChart'))
      var myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("myChart")) : instanceByDom
      // 将echarts实例内的对象清空，再重新注入
      myChart.clear()
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      // resetSize
      window.onresize = function () {
        myChart.resize();
      };
    }
  }
}
</script>

<style scoped>
.lineChartBox{
  width: 100%;
  text-align: center;
}
#myChart{
  width: 100%;
  height: 400px;
}
</style>
