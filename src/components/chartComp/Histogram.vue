<template class="histogram">
  <div id="myChart" />
</template>

<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=bar-simple
export default {
  name: 'Histogram',
  // 数据域
  data() {
    return {
      apiData: [1, 2, 3, 4, 5],
      label: [1, 2, 3, 4, 5],
      myChart: null
    }
  },
  // 钩子函数
  mounted() {

    setTimeout(() => {
      // 该方法必须放在方法域中的最后一个
      this.drawLine();
    }, 10)
  },
  // 离开这个组件前的操作
  beforeDestroy() {
    // 在离开这个组件前清除图形对象
    // 如果设置了定时器离开组件前清除对象
    // this.myChart.clear()
  },

  // 方法区
  methods: {
    // 方法域中的其他方法
    
    drawLine() {
      // 图设置
      var option = {
        grid: {
          left: '1%',
          containLabel: true
        },
        title: { text: '数值' },
        tooltip: {
          position: function(pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = { top: 60 }
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
            return obj
          }
        },
        xAxis: {
          data: this.label
        },
        yAxis: {},
        series: [{
          name: '参数值',
          type: 'bar',
          data: this.apiData
        }]
      }
      // 基于准备好的dom，初始化echarts实例
      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('myChart'))
      this.myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("myChart")) : instanceByDom
      // 将echarts实例内的对象清空，再重新注入
      this.myChart.clear()
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option)
      // resetSize
      window.onresize = function () {
        this.myChart.resize();
      };
    }
  }
}
</script>

<style scoped>
.histogram {
  width: 100%;
  text-align: center;
}

#myChart {
  width: 100%;
  height: 400px;
}
</style>
