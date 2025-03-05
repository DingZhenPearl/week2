<template class="dynamicDataTimeLine">
  <div id="myChart"/>
</template>

<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=dynamic-data2
export default {
  name: 'DynamicDataTimeLine',
  // 数据域
  data() {
    return {
      apiData: [],
      now: [],
      oneDay: [],
      currValue: [],
      timer: 'timer'
    }
  },
  // 钩子函数
  mounted() {

    this.now = new Date(1997, 9, 3)
    this.oneDay = 24 * 3600 * 1000
    this.currValue = Math.random() * 1000
    for (var i = 0; i < 1000; i++) {
      this.apiData.push(this.randomData())
    }
    this.timer = setInterval(this.handlerData, 1000)

  },
  beforeDestroy() {
    //设置定时器后需要删除
    if (this.timer !== 'timer') {
      clearInterval(this.timer)
      this.timer = 'timer'
    }
  },
  // 方法区
  methods: {
    // 方法域中的其他方法

    handlerData() {
      for (var i = 0; i < 5; i++) {
        this.apiData.shift()
        this.apiData.push(this.randomData())
      }
      // 该方法必须放在方法域中的最后一个
      this.drawLine()
    },

    randomData() {
      this.now = new Date(+this.now + this.oneDay)
      this.currValue = this.currValue + Math.random() * 21 - 10
      return {
        name: this.now.toString(),
        value: [
          [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
          Math.round(this.currValue)
        ]
      }
    },

    // 该方法必须放在方法域中的最后一个
    drawLine() {
      var option = {
        //设置图标标题
        title: {
          text: 'Dynamic Data & Time Axis'
        },
        //图标提示框组件
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            params = params[0]
            var date = new Date(params.name)
            return (
                date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear() +
                ' : ' +
                params.value[1]
            )
          },
          axisPointer: {
            animation: false
          }
        },
        //设置x轴配置
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        //设置y轴配置
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: this.apiData
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
.dynamicDataTimeLine {
  width: 80%;
  text-align: center;
}

#myChart {
  width: 100%;
  height: 400px;
}
</style>
