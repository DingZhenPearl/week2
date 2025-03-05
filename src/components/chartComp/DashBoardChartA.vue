<template class="dashBoardChartA">
  <div id="myChart" />
</template>

<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=gauge
export default {
  name: 'DashBoardChartA',
  // 数据域
  data() {
    return {
      apiData: [10, 20, 30, 10, 50, 80, 10, 5, 100, 55, 30],
      //最后一个值实际上没用到
      value: 50,
      index: 0,
      timer: 'timer'
    }
  },
  // 钩子函数
  mounted() {

    this.timer = setInterval(this.handlerData, 1000)
  },
  beforeDestroy() {
    // 设置定时器后需要删除
    if (this.timer !== 'timer') {
      clearInterval(this.timer)
      this.timer = 'timer'
    }
  },
  // 方法区
  methods: {
    // 方法域中的其他方法

    handlerData() {
      this.value = this.apiData[this.index]
      this.index = (this.index + 1) % 10
      // 该方法必须放在方法域中的最后一个
      this.drawLine()
    },

    drawLine() {
      var option = {
        //图标提示框组件
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: this.value,
                name: 'SCORE'
              }
            ]
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('myChart'))
      var myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("myChart")) : instanceByDom
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
.dashBoardChartA {
  width: 100%;
  text-align: center;
}

#myChart {
  width: 100%;
  height: 400px;
}
</style>
