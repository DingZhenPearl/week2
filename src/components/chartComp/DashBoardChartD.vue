<template class="dashBoardChartD">
  <div id="myChart"/>
</template>

<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=gauge-grade
export default {
  name: 'DashBoardChartD',
  // 数据域
  data() {
    return {
      apiData: 70,
      timer: 'timer'
    }
  },
  // 钩子函数
  mounted() {
    this.timer = setInterval(this.handlerData, 2000)
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
      this.apiData = +(Math.random() * 100).toFixed(2)
      // 该方法必须放在方法域中的最后一个
      this.drawLine()
    },

    // 该方法必须放在方法域中的最后一个
    drawLine() {
      var option = {
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [
          {
            type: 'gauge',
            axisLine: {
              lineStyle: {
                width: 20,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              color: 'auto',
              distance: 40,
              fontSize: 12
            },
            detail: {
              valueAnimation: true,
              formatter: '{value} km/h',
              color: 'auto',
              fontSize: 18
            },
            data: [
              {
                value: this.apiData
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
.dashBoardChartD {
  width: 100%;
  text-align: center;
}

#myChart {
  width: 100%;
  height: 400px;
}
</style>
