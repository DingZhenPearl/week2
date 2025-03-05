<template class="surfaceChart">
  <div id="myChart" />
</template>

<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=bar3d-dataset&gl=1
export default {
  name: 'SurfaceChart',
  // 数据域
  data() {
    return {
      apiData: [[1, 2, -1], [-1, -2, -3], [1, 1, 3], [-1, 2, 3], [1, 2, -3], [1, -2, -1], [-1, -2, -3], [1, -1, 3], [-1, -2, 3], [1, -2, -3]]

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
      // 指定图表的配置项和数据
      var option = {
        tooltip: {},
        backgroundColor: '#fff',
        //视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素。视觉元素可以是：symbol: 图元的图形类别。symbolSize: 图元的大小。color: 图元的颜色。
        visualMap: {
          //是否显示 visualMap-continuous 组件。
          show: false,
          //指定用数据的『哪个维度』，映射到视觉元素上。
          dimension: 2,
          //指定 visualMapContinuous 组件的允许的最小值
          min: -1,
          //指定 visualMapContinuous 组件的允许的最大值
          max: 1,
          //定义 在选中范围中 的视觉元素
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          }
        },
        //x轴的name属性
        xAxis3D: {
          type: 'value'
        },
        //y轴的name属性
        yAxis3D: {
          type: 'value'
        },
        //z轴的name属性
        zAxis3D: {
          type: 'value'
        },
        grid3D: {
          viewControl: {
            // 正交投影'orthographic'
            projection: 'orthographic'
          }
        },
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [
          {
            type: 'surface',
            wireframe: {
              // show: false
            },
            equation: {
              x: {
                step: 0.05
              },
              y: {
                step: 0.05
              },
              z: function(x, y) {
                if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
                  return '-'
                }
                return Math.sin(x * Math.PI) * Math.sin(y * Math.PI)
              }
            },
            data: this.apiData
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
.surfaceChart {
  width: 100%;
  text-align: center;
}

#myChart {
  width: 100%;
  height: 400px;
}
</style>
