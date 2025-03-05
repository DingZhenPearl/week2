<template class="dashBoardChartB">
  <div id="myChart"/>
</template>

<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=gauge-temperature

export default {
  name: 'DashBoardChart',
  // 数据域
  data() {
    return {
      apiData: 20,
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
      this.apiData = +(Math.random() * 60).toFixed(2)
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
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            // 等分
            splitNumber: 12,
            itemStyle: {
              color: '#FFAB91'
            },
            progress: {
              show: true,
              width: 15
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                // 进度粗细
                width: 20
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              // 刻度字体
              color: '#999',
              fontSize: 12
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              // 当前刻度字体
              fontSize: 20,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: 'auto'
            },
            data: [
              {
                value: this.apiData
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
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
.dashBoardChartB {
  width: 80%;
  text-align: center;
}

#myChart {
  width: 100%;
  height: 400px;
}
</style>
