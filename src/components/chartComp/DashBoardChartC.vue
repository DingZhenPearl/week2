<template className="dashBoardChartC">
  <div id="myChart"/>
</template>

<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=gauge-grade
export default {
  name: 'DashBoardChart',
  // 数据域
  data() {
    return {
      apiData: [
        {
          value: 0.7,
          name: 'Rating'
        }
      ]

    }
  },
  // 钩子函数
  mounted() {
    // 向父组件发送数据
    this.$emit('chart-data', {
      type: 'rating',
      data: this.apiData
    })
    // 该方法必须放在方法域中的最后一个
    this.drawLine()
  },
  // 方法区
  methods: {
    // 方法域中的其他方法

    // 该方法必须放在方法域中的最后一个
    drawLine() {
      var option = {
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '75%'],
            radius: '80%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 3,
                color: [
                  [0.25, '#FF6E76'],
                  [0.5, '#FDDD60'],
                  [0.75, '#58D9F9'],
                  [1, '#7CFFB2']
                ]
              }
            },
            // 是否有指针
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 10,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            axisLabel: {
              color: '#464646',
              fontSize: 12,
              distance: -60,
              rotate: 'tangential',
              formatter: function (value) {
                if (value === 0.875) {
                  return 'A'
                } else if (value === 0.625) {
                  return 'B'
                } else if (value === 0.375) {
                  return 'C'
                } else if (value === 0.125) {
                  return 'D'
                }
                return ''
              }
            },
            title: {
              offsetCenter: [0, '-10%'],
              fontSize: 10
            },
            detail: {
              fontSize: 20,
              offsetCenter: [0, '-35%'],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value * 100) + ''
              },
              color: 'auto'
            },
            data: this.apiData
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('myChart'))
      var myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("myChart")) : instanceByDom
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      
      // 添加点击事件
      myChart.off('click')
      myChart.on('click', (params) => {
        this.$emit('chart-click', {
          componentType: params.componentType,
          componentSubType: params.componentSubType,
          value: this.apiData[0].value
        })
      })
      
      // resetSize
      window.onresize = function () {
        myChart.resize();
      };
    }

  }
}
</script>

<style scoped>
.dashBoardChartC {
  width: 80%;
  text-align: center;
}

#myChart {
  width: 100%;
  height: 400px;
}
</style>
