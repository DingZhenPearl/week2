<template class="SignalChart">
  <div id="myChart"></div>
</template>

<script>
export default {
  name: 'SignalChart',
  // 数据域
  data() {
    return {
      chartData: [1,2,3,4,5,6,7,8,8,8,9]
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
    drawLine() {
      var option = {
        //图标提示框组件
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        //设置图标标题
        title: {
          left: 'center',
          text: 'Large Ara Chart'
        },
        // 是ECharts中的工具栏
        toolbox: {
          // toolbox的配置项
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        //设置x轴配置
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        //设置y轴配置
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        // 拖拉条位置调整以及缩放最大值设置
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: this.chartData
          }
        ]
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
.signalChart {
  width: 100%;
  text-align: center;
}

#myChart {
  width: 100%;
  height: 400px;
}
</style>
